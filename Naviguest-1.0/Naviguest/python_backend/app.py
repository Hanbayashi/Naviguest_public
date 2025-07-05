# C:\Users\81807\Naviguest_public\Naviguest-1.0\Naviguest\python_backend\app.py

from flask import Flask, jsonify, request # request を追加インポート
from flask_cors import CORS # CORS対策のためにインポート

app = Flask(__name__)
# CORS設定を以下に修正
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000", "methods": ["GET", "POST", "OPTIONS"]}})

# テスト用のAPIエンドポイントを定義
@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify(message="Hello from Python backend!")

# /api/update_number エンドポイント (POSTおよびOPTIONSリクエスト)
@app.route('/api/update_number', methods=['POST', 'OPTIONS'])
def update_number():
    if request.method == 'OPTIONS':
        return '', 200
    else:
        data = request.get_json()
        number = data.get('number', 0)
        calculated_value = number * 10
        return jsonify({"status": "success", "received_number": number, "calculated_value": calculated_value})

# ★★★ MapPageから呼ばれる /api/get_current_number エンドポイントを追加 ★★★
@app.route('/api/get_current_number', methods=['GET'])
def get_current_number():
    # ここでは仮のデータを返します。
    # 実際には、データベースや他のストレージから最新の数値を取得するロジックが入ります。
    # 例として、常に0と0を返します。
    current_number = 0
    last_calculated_result = 0
    return jsonify({
        "current_number": current_number,
        "last_calculated_result": last_calculated_result
    })

# アプリケーションを実行
if __name__ == '__main__':
    app.run(debug=True, port=5000)