# C:\Users\81807\Naviguest_public\Naviguest-1.0\Naviguest\python_backend\app.py

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000", "methods": ["GET", "POST", "OPTIONS"]}})

# ★★★ グローバル変数で値を保持する場所を定義 (既にこの部分は存在するはず) ★★★
current_received_number = 0
last_calculated_result = 0

# テスト用のAPIエンドポイント
@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify(message="Hello from Python backend!")

# /api/update_number エンドポイント (POSTおよびOPTIONSリクエスト)
@app.route('/api/update_number', methods=['POST', 'OPTIONS'])
def update_number():
    global current_received_number, last_calculated_result # グローバル変数を修正可能にする

    if request.method == 'OPTIONS':
        return '', 200
    else:
        data = request.get_json()
        number = data.get('number', 0)
        calculated_value = number * 10

        # ★★★ 受け取った数値と計算結果をグローバル変数に保存 (既にこの部分は存在するはず) ★★★
        current_received_number = number
        last_calculated_result = calculated_value

        return jsonify({
            "status": "success",
            "received_number": number,
            "calculated_value": calculated_value
        })

# MapPageから呼ばれる /api/get_current_number エンドポイント
@app.route('/api/get_current_number', methods=['GET'])
def get_current_number():
    # ★★★ ここを修正！グローバル変数に保存された最新の数値を返すように変更 ★★★
    return jsonify({
        "current_number": current_received_number, # 0ではなくグローバル変数
        "last_calculated_result": last_calculated_result # 0ではなくグローバル変数
    })

# アプリケーションを実行
if __name__ == '__main__':
    app.run(debug=True, port=5000)