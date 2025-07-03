# python_backend\app.py
from flask import Flask, jsonify
from flask_cors import CORS # CORS対策のためにインポート

app = Flask(__name__)
# CORSを有効にする。Reactアプリからのアクセスを許可するために必須。
# 開発環境では全てのオリジンを許可するのが手軽ですが、
# 本番環境ではReactアプリの正確なURLを指定することをお勧めします。
# 例: CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
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