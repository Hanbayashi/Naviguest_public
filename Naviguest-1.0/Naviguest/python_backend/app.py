from flask import Flask, jsonify, request
from flask_cors import CORS
from collections import deque
import os 

app = Flask(__name__)

# CORS設定: Reactアプリケーションが動作するポート3000からのアクセスを許可
# 環境変数 CORS_ORIGIN が設定されていればそれを使用、なければ http://localhost:3000 をデフォルトとする
CORS_ORIGIN = os.environ.get("CORS_ORIGIN", "http://localhost:3000")
CORS(app, resources={r"/api/*": {"origins": CORS_ORIGIN, "methods": ["GET", "POST", "OPTIONS"]}})


# --- グラフ定義 ---
# 施設の各ノード（点）とその隣接ノードを定義したグラフ
graph = {
    1: [2, 3, 4, 5, 6],
    2: [1, 3],
    3: [2, 4],
    4: [1, 3, 5],
    5: [4, 6, 7],
    6: [1, 5, 7],
    7: [5, 6, 8, 9],
    8: [7, 9],
    9: [7, 8],
    10: [11],
    11: [10, 12],
    12: [11, 13, 14],
    13: [12, 14],
    14: [12, 13],
    15: [16],
    16: [15, 17],
    17: [16, 18],
    18: [17],
    19: [20, 21],
    20: [19, 21],
    21: [19, 20],
    22: [23],
    23: [22, 24],
    24: [23],
    25: [26, 27],
    26: [25, 27],
    27: [25, 26],
    28: [29, 30],
    29: [28, 30],
    30: [28, 29],
    31: [32],
    32: [31]
}

# --- ヘルパー関数: 最短経路探索 (BFS) ---
def bfs_shortest_path(graph, start, goal):
    """
    グラフ上で開始ノードから目標ノードまでの最短経路を幅優先探索(BFS)で見つける。
    """
    visited = set()  # 訪問済みのノードを記録
    queue = deque([[start]])  # 探索キュー。各要素はこれまでの経路を示すリスト。

    while queue:
        path = queue.popleft()  # キューの先頭から経路を取り出す
        node = path[-1]  # 現在のノードは経路の最後の要素

        if node == goal:
            return path  # 目標に到達したら経路を返す

        if node not in visited:
            visited.add(node)  # 現在のノードを訪問済みとしてマーク
            if node in graph:  # グラフにノードが存在するか確認
                for neighbor in graph[node]:
                    # 隣接ノードが未訪問の場合のみ新しい経路を作成
                    if neighbor not in visited:
                        new_path = path + [neighbor]  # 新しい経路を作成
                        queue.append(new_path)  # キューに追加
    return None  # 経路が見つからなかった場合

# --- 施設構造の定義 ---
# 各階に属するノード番号のリスト
floor_1 = list(range(1, 10))       # 1〜9
floor_2 = list(range(10, 15))      # 10〜14
floor_3 = list(range(15, 22))      # 15〜21
floor_4 = list(range(22, 28))      # 22〜27
floor_5 = list(range(28, 31))      # 28〜30
floor_6 = list(range(31, 33))      # 31〜32

# ノード番号から階層名を検索するための辞書
room_to_floor = {}
for room in floor_1:
    room_to_floor[room] = "1F"
for room in floor_2:
    room_to_floor[room] = "2F"
for room in floor_3:
    room_to_floor[room] = "3F"
for room in floor_4:
    room_to_floor[room] = "4F"
for room in floor_5:
    room_to_floor[room] = "5F"
for room in floor_6:
    room_to_floor[room] = "6F"

# 別館に属するノードのリスト
annex_nodes = [7, 8, 9, 12, 13, 14, 19, 20, 21, 25, 26, 27, 28, 29, 30, 31, 32]

# エレベーターがあるノードのリスト
elevator_nodes = [2,7,11,12,17,19,23,25,28,31]

# --- 施設情報に関するヘルパー関数 ---
def get_floor_info(node1, node2):
    """
    2つのノードの階層情報を取得し、同じ階にあるか判定する。
    """
    floor1 = room_to_floor.get(node1, "不明")
    floor2 = room_to_floor.get(node2, "不明")
    same_floor = (floor1 == floor2) and (floor1 != "不明")
    return floor1, floor2, same_floor

def is_in_annex(node):
    """
    指定されたノードが別館に属するかどうかを判定する。
    """
    return node in annex_nodes

# --- 経路探索ロジック ---
# グローバル変数で現在のゴールノードと現在の位置を保持
_global_goal_node = None
# アプリケーション起動時の初期現在地ノード。
# startpointpage.jsxから /api/set_initial_current_node で上書きされることが期待される。
_global_current_node = 1 

def find_next_point(current_node_arg, goal_node_arg=None):
    """
    現在のノードと目的地（goal_node_arg）に基づいて、次の移動ポイント、
    現在の階、現在の館、そして経路案内メッセージを計算する。
    """
    global _global_goal_node, _global_current_node

    # 関数呼び出し時のcurrent_nodeをグローバルな現在地として更新
    # MapPage.jsxから呼ばれる際はここでcurrent_nodeが更新される
    _global_current_node = current_node_arg

    # goal_node_argが指定された場合はグローバルゴールを更新し、
    # そうでなければ現在のグローバルゴールを使用
    if goal_node_arg is not None:
        _global_goal_node = goal_node_arg
    elif _global_goal_node is None:
        # ゴールが未設定の場合はエラーメッセージを返す
        return {
            "next_point": None,
            "current_floor": room_to_floor.get(current_node_arg, "不明"),
            "current_building": "本館" if not is_in_annex(current_node_arg) else "別館",
            "goal_node": None,
            "message": "目的地が設定されていません。"
        }
    
    actual_goal = _global_goal_node # 現在の処理で使う実際のゴールノード

    # 現在地と目的地の階層および館の情報を取得
    current_floor = room_to_floor.get(current_node_arg, "不明")
    goal_floor = room_to_floor.get(actual_goal, "不明")
    
    current_building = "本館" if not is_in_annex(current_node_arg) else "別館"
    goal_building = "本館" if not is_in_annex(actual_goal) else "別館"

    path_segments = [] # 経路案内メッセージを格納するリスト
    next_point = None  # 次に進むべきノードを初期化

    # --- 経路探索ロジックの本体 ---
    # 目的地ノードが設定されており、かつ現在のノードと目的地ノード、そしてその階が全て一致する場合に「到着」と判断
    if actual_goal is not None and \
       current_node_arg == actual_goal and \
       current_floor == goal_floor:
        # 目的地に到着
        next_point = None
        path_segments.append(f"目的地 {actual_goal} に到着しました。")
        _global_goal_node = None # ゴールに到着したらリセット
    elif current_floor == goal_floor and current_building == goal_building:
        # 同じ階・同じ館の場合：BFSで直接探索
        path = bfs_shortest_path(graph, current_node_arg, actual_goal)
        if path and len(path) > 1:
            next_point = path[1]
            path_segments.append(f"同じ階の {current_floor} ({current_building}) で、{current_node_arg} から {actual_goal} への経路が見つかりました。次のポイントは {next_point} です。")
        else:
            path_segments.append(f"同じ階の {current_floor} ({current_building}) 内で、{current_node_arg} から {actual_goal} への経路が見つかりませんでした。")
    else:
        # 異なる階または異なる館の場合：エレベーター・接続点を経由するロジック

        # まず、現在の建物から目的地の建物へ移動する必要があるか判定
        if current_building != goal_building:
            path_segments.append(f"【館移動】{current_building} から {goal_building} へ移動します。")
            # 別館への接続点 (ノード7) または本館への接続点 (ノード1) を仮定
            # 実際には、現在地から最も近い接続点をBFSで探すべき
            connection_point = None
            if current_building == "本館" and goal_building == "別館":
                # 本館から別館へ
                candidates = [node for node in graph[current_node_arg] if is_in_annex(node)] # 隣接する別館ノードを探す
                if candidates:
                    connection_point = candidates[0] # 一旦隣接する別館ノードがあればそこへ
                else: # 隣接する別館ノードがなければ、最も近い別館接続点へ（仮に7）
                    path_to_conn = bfs_shortest_path(graph, current_node_arg, 7)
                    if path_to_conn and len(path_to_conn) > 1:
                        next_point = path_to_conn[1]
                        path_segments.append(f"まず {current_node_arg} から別館接続点 (ノード 7) へ向かってください。")
                        return {
                            "next_point": next_point,
                            "current_floor": current_floor,
                            "current_building": current_building,
                            "goal_node": actual_goal,
                            "message": " ".join(path_segments).strip()
                        }
                    connection_point = 7 # 強制的に7へ
            elif current_building == "別館" and goal_building == "本館":
                # 別館から本館へ
                candidates = [node for node in graph[current_node_arg] if not is_in_annex(node)] # 隣接する本館ノードを探す
                if candidates:
                    connection_point = candidates[0] # 一旦隣接する本館ノードがあればそこへ
                else: # 隣接する本館ノードがなければ、最も近い本館接続点へ（仮に1）
                    path_to_conn = bfs_shortest_path(graph, current_node_arg, 1)
                    if path_to_conn and len(path_to_conn) > 1:
                        next_point = path_to_conn[1]
                        path_segments.append(f"まず {current_node_arg} から本館接続点 (ノード 1) へ向かってください。")
                        return {
                            "next_point": next_point,
                            "current_floor": current_floor,
                            "current_building": current_building,
                            "goal_node": actual_goal,
                            "message": " ".join(path_segments).strip()
                        }
                    connection_point = 1 # 強制的に1へ
            
            if connection_point and current_node_arg != connection_point:
                path_to_conn = bfs_shortest_path(graph, current_node_arg, connection_point)
                if path_to_conn and len(path_to_conn) > 1:
                    next_point = path_to_conn[1]
                    path_segments.append(f"{current_node_arg} から {connection_point} ({goal_building} 接続点) へ向かってください。")
                elif path_to_conn and len(path_to_conn) == 1:
                    # 既に接続点にいる場合
                    path_segments.append(f"あなたは既に {connection_point} ({goal_building} 接続点) にいます。")
                else:
                    path_segments.append(f"{goal_building} 接続点への経路が見つかりませんでした。")
                
                # ここで次のポイントが設定されていれば、館移動を優先
                if next_point is not None:
                    return {
                        "next_point": next_point,
                        "current_floor": current_floor,
                        "current_building": current_building,
                        "goal_node": actual_goal,
                        "message": " ".join(path_segments).strip()
                    }

        # 階移動が必要な場合（同じ館でも階が違う、または館移動後に階移動が必要）
        path_segments.append(f"【階移動】{current_floor} から {goal_floor} へ移動します。")

        # 現在地から最も近いエレベーターを探す
        # 同じ建物内のエレベーターのみを対象
        current_building_elevators = [
            node for node in elevator_nodes
            if is_in_annex(node) == is_in_annex(current_node_arg) # 現在の建物と同じ建物
        ]
        
        closest_elevator_path = None
        closest_elevator = None

        for elevator in current_building_elevators:
            path_to_elevator = bfs_shortest_path(graph, current_node_arg, elevator)
            if path_to_elevator:
                if closest_elevator_path is None or len(path_to_elevator) < len(closest_elevator_path):
                    closest_elevator_path = path_to_elevator
                    closest_elevator = elevator
        
        if closest_elevator_path and len(closest_elevator_path) > 1:
            next_point = closest_elevator_path[1]
            path_segments.append(f"{current_node_arg} からエレベーター ({closest_elevator}) へ向かってください。")
        elif closest_elevator_path and len(closest_elevator_path) == 1:
            # 既にエレベーターにいる場合
            path_segments.append(f"エレベーター ({current_node_arg}) に到着しました。{goal_floor} へ移動してください。")
            # ここで次のポイントはまだ確定しない。階移動はユーザーの行動に依存。
            # 階移動後、MapPageが新しいcurrent_nodeで再度APIを叩くことを期待。
            next_point = None # エレベーターにいるので、次を返さない
        else:
            path_segments.append(f"現在の階からエレベーターが見つかりませんでした。")
            next_point = None # 経路が見つからなければ次はない

    # 全ての経路探索が終わっても next_point が None で、かつゴールに未到達の場合
    if next_point is None and current_node_arg != actual_goal:
        # この最終フォールバックは、メッセージが空で経路が見つからなかった場合などに役立つ
        if not path_segments:
            path_segments.append("経路が見つかりませんでした。")
        # else: メッセージがあればそのまま

    # 結果を辞書形式で返す
    return {
        "next_point": next_point,
        "current_floor": current_floor,
        "current_building": current_building,
        "goal_node": actual_goal,
        "message": " ".join(path_segments).strip() # 複数のメッセージを結合して返す
    }


# APIエンドポイントを定義
@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify(message="Hello from Python backend!")

# /api/update_goal エンドポイント (ChoosePage.jsxから呼ばれる)
@app.route('/api/update_goal', methods=['POST', 'OPTIONS'])
def update_goal():
    global _global_goal_node # グローバル変数を修正可能にする

    if request.method == 'OPTIONS':
        return '', 200 # CORSプリフライトリクエストへの応答
    else:
        data = request.get_json()
        goal_node = data.get('goal_node') # 'goal_node'というキーで値を受け取る

        if goal_node is None:
            return jsonify({"status": "error", "message": "goal_nodeが指定されていません。"}), 400
        
        # 受け取ったゴールノードをグローバル変数に保存
        _global_goal_node = goal_node

        return jsonify({
            "status": "success",
            "received_goal_node": goal_node,
            "message": f"目的地を {goal_node} に設定しました。"
        })

# --- 新しいエンドポイント: 初期現在地を設定 (startpointpage.jsxから呼ばれる) ---
@app.route('/api/set_initial_current_node', methods=['POST', 'OPTIONS'])
def set_initial_current_node():
    global _global_current_node

    if request.method == 'OPTIONS':
        return '', 200 # CORSプリフライトリクエストへの応答
    else:
        data = request.get_json()
        initial_current_node = data.get('initial_current_node')

        if initial_current_node is None:
            return jsonify({"status": "error", "message": "initial_current_nodeが指定されていません。"}), 400
        
        # 受け取った初期現在地ノードをグローバル変数に保存
        _global_current_node = initial_current_node
        print(f"初期現在地が {initial_current_node} に設定されました。") # デバッグ出力

        return jsonify({
            "status": "success",
            "set_initial_current_node": initial_current_node,
            "message": f"初期現在地を {initial_current_node} に設定しました。"
        })

# --- 新しいエンドポイント: 現在のグローバルな現在地ノードを取得 (Map.jsxから呼ばれる初回ロード時) ---
@app.route('/api/get_current_node', methods=['GET'])
def get_current_node():
    global _global_current_node
    # current_node と status をJSONで返す
    return jsonify({"current_node": _global_current_node, "status": "success"})


# /api/get_next_point エンドポイント (Map.jsxから呼ばれる)
@app.route('/api/get_next_point', methods=['POST']) # 現在地を受け取るためPOSTを使用
def get_next_point():
    global _global_current_node, _global_goal_node

    data = request.get_json()
    current_node_from_react = data.get('current_node') # Reactから現在のノードを受け取る

    if current_node_from_react is None:
        return jsonify({"status": "error", "message": "current_nodeが指定されていません。"}), 400

    # find_next_pointを呼び出して次の移動ポイントと経路案内情報を取得
    # goal_node_argはNoneにし、_global_goal_nodeが使われるようにする
    result = find_next_point(current_node_arg=current_node_from_react, goal_node_arg=None)

    # 経路探索結果をJSON形式で返す
    return jsonify({
        "next_point": result["next_point"],
        "current_floor": result["current_floor"],
        "current_building": result["current_building"],
        "goal_node": result["goal_node"],
        "message": result["message"]
    })

# アプリケーションを実行
if __name__ == '__main__':
    app.run(debug=True, port=5000)