# python_backend\app.py

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000", "methods": ["GET", "POST", "OPTIONS"]}})


@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify(message="Hello from Python backend!")

@app.route('/api/update_number', methods=['POST', 'OPTIONS']) # ★★★ ここに 'OPTIONS' を追加 ★★★
def update_number():
    if request.method == 'OPTIONS':
        # プリフライトリクエストへの応答
        return '', 200 # ステータスコード200で空の応答を返す
    else:
        # 通常のPOSTリクエストの処理
        data = request.get_json()
        number = data.get('number', 0)
        calculated_value = number * 10
        return jsonify({"status": "success", "received_number": number, "calculated_value": calculated_value})

if __name__ == '__main__':
    app.run(debug=True, port=5000)