# python_backend\app.py
from flask import Flask, jsonify, request
from flask_cors import CORS # CORS対策のためにインポート

app = Flask(__name__)
CORS(app)

@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify(message="Hello from Python backend!")

@app.route('/api/update_number', methods=['POST'])
def update_number():
    data = request.get_json() # POSTされたJSONデータを取得
    number = data.get('number', 0) # 'number' キーの値を取得、なければ0

    # ここでPythonでの処理を行う
    calculated_value = number * 10 # 例: 受け取った数値を10倍する

    return jsonify({"status": "success", "received_number": number, "calculated_value": calculated_value})

if __name__ == '__main__':
    app.run(debug=True, port=5000)