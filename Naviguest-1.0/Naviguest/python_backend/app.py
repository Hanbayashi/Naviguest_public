# python_backend\app.py
from flask import Flask, jsonify
from flask_cors import CORS # CORS対策のためにインポート

app = Flask(__name__)
CORS(app)

# テスト用のAPIエンドポイントを定義
@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify(message="Hello from Python backend!")

# アプリケーションを実行
if __name__ == '__main__':
    # 開発中はデバッグモードを有効にし、ポート5000で実行
    # Reactアプリが通常ポート3000で動作するため、異なるポートを使用します。
    app.run(debug=True, port=5000)