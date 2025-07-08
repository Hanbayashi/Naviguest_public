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
# エレベーター間の直接接続は含めず、階内での接続のみを定義します。
graph = {
    1: [2, 3, 4, 5, 6],
    2: [1, 3], 
    3: [1, 2, 4], # ★ここを変更しました：ノード1を追加★
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
# forbidden_nodes 引数を追加
def bfs_shortest_path(graph, start, goal, forbidden_nodes=None):
    """
    グラフ上で開始ノードから目標ノードまでの最短経路を幅優先探索(BFS)で見つける。
    forbidden_nodes: 探索中に経由してはいけないノードのリスト (中間地点としてのみ適用)
    """
    if forbidden_nodes is None:
        forbidden_nodes = set()
    else:
        forbidden_nodes = set(forbidden_nodes) # 検索を高速化するためセットに変換

    visited = set()  # 訪問済みのノードを記録
    queue = deque([[start]])  # 探索キュー。各要素はこれまでの経路を示すリスト。

    # 開始ノードや目標ノード自体がforbidden_nodesに含まれていても、
    # 探索の開始と終了は可能にする（中間地点としてのみ禁止）

    while queue:
        path = queue.popleft()  # キューの先頭から経路を取り出す
        node = path[-1]  # 現在のノードは経路の最後の要素

        if node == goal:
            return path  # 目標に到達したら経路を返す

        if node not in visited:
            visited.add(node)  # 現在のノードを訪問済みとしてマーク
            if node in graph:  # グラフにノードが存在するか確認
                for neighbor in graph[node]:
                    # 隣接ノードがforbidden_nodesに含まれておらず、かつ未訪問の場合のみ新しい経路を作成
                    # ただし、目標ノードがforbidden_nodesに含まれていても、そこが目標なら到達を許可する
                    if neighbor not in visited and \
                       (neighbor not in forbidden_nodes or neighbor == goal): # ★ここが変更点★
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

# グローバル変数で現在のゴールノードと現在の位置を保持
_global_goal_node = None
_global_current_node = 1 

def find_next_point(current_node_arg, goal_node_arg=None):
    """
    現在のノードと目的地（goal_node_arg）に基づいて、次の移動ポイント、
    現在の階、現在の館、そして経路案内メッセージを計算する。
    """
    global _global_goal_node, _global_current_node

    _global_current_node = current_node_arg

    if goal_node_arg is not None:
        _global_goal_node = goal_node_arg
    elif _global_goal_node is None:
        return {
            "next_point": None,
            "current_floor": room_to_floor.get(current_node_arg, "不明"),
            "current_building": "本館" if not is_in_annex(current_node_arg) else "別館",
            "goal_node": None,
            "message": "目的地が設定されていません。"
        }
    
    actual_goal = _global_goal_node

    current_floor = room_to_floor.get(current_node_arg, "不明")
    goal_floor = room_to_floor.get(actual_goal, "不明")
    
    current_building = "本館" if not is_in_annex(current_node_arg) else "別館"
    goal_building = "本館" if not is_in_annex(actual_goal) else "別館"

    path_segments = []
    next_point = None

    # 指定された階層番号が3以上か判定するヘルパー
    def is_floor_3f_or_higher(floor_str):
        if floor_str == "不明":
            return False
        try:
            floor_num = int(floor_str.replace("F", ""))
            return floor_num >= 3
        except ValueError:
            return False

    # --- 経路探索ロジックの本体 ---
    if actual_goal is not None and \
       current_node_arg == actual_goal and \
       current_floor == goal_floor:
        # 目的地に到着
        next_point = None
        path_segments.append(f"目的地に到着しました。") # シンプルなメッセージ
        _global_goal_node = None # ゴールに到着したらリセット
    # 現在地が3F以上で、かつ目的地と館が違う場合にノード1への案内を優先
    elif current_building != goal_building and is_floor_3f_or_higher(current_floor):
        path_segments.append(f"目的地は{goal_building}ですが、今{current_building}にいます。一度1階に戻ります。\n") 
        
        # Step 1: Find the nearest elevator on the current floor within the current building
        target_elevators_on_current_floor = []
        if is_in_annex(current_node_arg): # If currently in annex
            target_elevators_on_current_floor = [e for e in elevator_nodes if is_in_annex(e) and room_to_floor.get(e) == current_floor]
        else: # If currently in main building
            target_elevators_on_current_floor = [e for e in elevator_nodes if not is_in_annex(e) and room_to_floor.get(e) == current_floor]

        closest_elevator_path = None
        closest_elevator = None

        for elevator in target_elevators_on_current_floor:
            path_to_elevator = bfs_shortest_path(graph, current_node_arg, elevator)
            if path_to_elevator:
                if closest_elevator_path is None or len(path_to_elevator) < len(closest_elevator_path):
                    closest_elevator_path = path_to_elevator
                    closest_elevator = elevator

        if closest_elevator_path and len(closest_elevator_path) > 1:
            # User is not at an elevator, guide them to the closest elevator
            next_point = closest_elevator_path[1]
            path_segments.append(f"{next_point}番に向かってください。") # シンプルなメッセージ
        elif closest_elevator_path and len(closest_elevator_path) == 1:
            # User is already at an elevator on the current floor
            # Instruct them to go to 1F
            path_segments.append(f"エレベーターで1Fに移動してください。") # シンプルなメッセージ
            next_point = None # Vertical movement, no next node in horizontal graph
        else:
            # No elevator found on current floor/building, fallback to original Node 1 instruction if possible
            path_to_node1 = bfs_shortest_path(graph, current_node_arg, 1)
            if path_to_node1 and len(path_to_node1) > 1:
                next_point = path_to_node1[1]
                path_segments.append(f"{next_point}番に向かってください。") # シンプルなメッセージ
            elif path_to_node1 and len(path_to_node1) == 1:
                # Already at Node 1
                path_segments.append(f"あなたは既に本館1Fの入口 (ノード 1) にいます。") # これは一旦そのまま。次のステップで目的案内
                path_from_node1_to_goal = bfs_shortest_path(graph, current_node_arg, actual_goal)
                if path_from_node1_to_goal and len(path_from_node1_to_goal) > 1:
                    next_point = path_from_node1_to_goal[1]
                    path_segments.append(f"{next_point}番に向かってください。") # シンプルなメッセージ
                else:
                    path_segments.append(f"経路が見つかりませんでした。") # シンプルなメッセージ
                    next_point = None
            else:
                path_segments.append(f"経路が見つかりませんでした。") # シンプルなメッセージ
                next_point = None
        
        return {
            "next_point": next_point,
            "current_floor": current_floor,
            "current_building": current_building,
            "goal_node": actual_goal,
            "message": " ".join(path_segments).strip()
        }
    elif current_floor == goal_floor and current_building == goal_building:
        # 同じ階・同じ館の場合：BFSで直接探索
        # 特定の経路ではノード1またはノード4を禁止してBFSを呼び出す
        if (current_node_arg == 4 and actual_goal == 5):
            path = bfs_shortest_path(graph, current_node_arg, actual_goal, forbidden_nodes=[1])
        # ★ここを変更しました：ノード2とノード4を禁止します★
        elif (current_node_arg == 3 and actual_goal == 5): 
            path = bfs_shortest_path(graph, current_node_arg, actual_goal, forbidden_nodes=[2, 4]) 
        elif (current_node_arg == 2 and actual_goal == 6):
            path = bfs_shortest_path(graph, current_node_arg, actual_goal, forbidden_nodes=[1])
        else:
            path = bfs_shortest_path(graph, current_node_arg, actual_goal)

        if path and len(path) > 1:
            next_point = path[1]
            path_segments.append(f"{next_point}番に向かってください。") # シンプルなメッセージ
        else:
            path_segments.append(f"経路が見つかりませんでした。") # シンプルなメッセージ
    else:
        # 異なる階または異なる館（上記の新ロジック以外）の場合
        
        # まず、異なる館への移動が必要な場合の案内 (1F, 2Fは本館別館が繋がっているため、ここでは直接接続点に誘導)
        if current_building != goal_building:
            connection_point = None
            if current_building == "本館" and goal_building == "別館":
                path_to_conn = bfs_shortest_path(graph, current_node_arg, 7) # ノード7を別館接続点と仮定
                if path_to_conn and len(path_to_conn) > 1:
                    next_point = path_to_conn[1]
                    path_segments.append(f"{next_point}番に向かってください。") # シンプルなメッセージ
                    return {
                        "next_point": next_point,
                        "current_floor": current_floor,
                        "current_building": current_building,
                        "goal_node": actual_goal,
                        "message": " ".join(path_segments).strip()
                    }
            elif current_building == "別館" and goal_building == "本館":
                path_to_conn = bfs_shortest_path(graph, current_node_arg, 1) # ノード1を本館接続点と仮定
                if path_to_conn and len(path_to_conn) > 1:
                    next_point = path_to_conn[1]
                    path_segments.append(f"{next_point}番に向かってください。") # シンプルなメッセージ
                    return {
                        "next_point": next_point,
                        "current_floor": current_floor,
                        "current_building": current_building,
                        "goal_node": actual_goal,
                        "message": " ".join(path_segments).strip()
                    }
            path_segments.append(f"経路が見つかりませんでした。") # シンプルなメッセージ

        # 階移動が必要な場合 (館移動が完了した、または館移動なしで階が異なる場合)
        if current_floor != goal_floor:
            # 現在地が本館か別館かによって、対象のエレベーター系統を絞る
            target_elevators = []
            if is_in_annex(current_node_arg): # 別館にいる場合
                target_elevators = [e for e in elevator_nodes if is_in_annex(e) and room_to_floor.get(e) == current_floor]
            else: # 本館にいる場合
                target_elevators = [e for e in elevator_nodes if not is_in_annex(e) and room_to_floor.get(e) == current_floor]

            closest_elevator_path = None
            closest_elevator = None

            # 現在の階にある、最も近いエレベーターを探す
            for elevator in target_elevators:
                path_to_elevator = bfs_shortest_path(graph, current_node_arg, elevator)
                if path_to_elevator:
                    if closest_elevator_path is None or len(path_to_elevator) < len(closest_elevator_path):
                        closest_elevator_path = path_to_elevator
                        closest_elevator = elevator
            
            if closest_elevator_path and len(closest_elevator_path) > 1:
                next_point = closest_elevator_path[1]
                path_segments.append(f"{next_point}番に向かってください。") # シンプルなメッセージ
            elif closest_elevator_path and len(closest_elevator_path) == 1:
                # 既にエレベーターにいる場合
                path_segments.append(f"エレベーターで{goal_floor}に移動してください。") # シンプルなメッセージ
                next_point = None 
            else:
                path_segments.append(f"経路が見つかりませんでした。") # シンプルなメッセージ
                next_point = None

    # 全ての経路探索が終わっても next_point が None で、かつゴールに未到達の場合
    if next_point is None and current_node_arg != actual_goal:
        # メッセージがまだない場合にのみ、一般的な「経路が見つかりませんでした」を追加
        if not path_segments:
            path_segments.append("経路が見つかりませんでした。")


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
    global _global_goal_node 

    if request.method == 'OPTIONS':
        return '', 200 
    else:
        data = request.get_json()
        goal_node = data.get('goal_node') 

        if goal_node is None:
            return jsonify({"status": "error", "message": "goal_nodeが指定されていません。"}), 400
        
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
        return '', 200 
    else:
        data = request.get_json()
        initial_current_node = data.get('initial_current_node')

        if initial_current_node is None:
            return jsonify({"status": "error", "message": "initial_current_nodeが指定されていません。"}), 400
        
        _global_current_node = initial_current_node
        print(f"初期現在地が {initial_current_node} に設定されました。") 

        return jsonify({
            "status": "success",
            "set_initial_current_node": initial_current_node,
            "message": f"初期現在地を {initial_current_node} に設定しました。"
        })

# --- 新しいエンドポイント: 現在のグローバルな現在地ノードを取得 (Map.jsxから呼ばれる初回ロード時) ---
@app.route('/api/get_current_node', methods=['GET'])
def get_current_node():
    global _global_current_node
    return jsonify({"current_node": _global_current_node, "status": "success"})


# /api/get_next_point エンドポイント (Map.jsxから呼ばれる)
@app.route('/api/get_next_point', methods=['POST']) 
def get_next_point():
    global _global_current_node, _global_goal_node

    data = request.get_json()
    current_node_from_react = data.get('current_node') 

    if current_node_from_react is None: 
        return jsonify({"status": "error", "message": "current_nodeが指定されていません。"}), 400

    result = find_next_point(current_node_arg=current_node_from_react, goal_node_arg=None)

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