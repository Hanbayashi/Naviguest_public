# Renderが推奨するPythonのベースイメージを使用
# 現状のPythonバージョンに合わせています
FROM python:3.13.4-slim-bookworm

# apt-get を使ってTesseract OCRエンジンと日本語言語パックをインストール
# --no-install-recommends をつけることで不要な推奨パッケージのインストールを抑制
# rm -rf /var/lib/apt/lists/* でAPTキャッシュを削除し、イメージサイズを小さく保つ
RUN apt-get update && \
    apt-get install -y \
        tesseract-ocr \
        tesseract-ocr-jpn \
        --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# 作業ディレクトリを設定
WORKDIR /app

# requirements.txt をコピーし、依存関係をインストール
# --no-cache-dir をつけることで、pipのキャッシュを生成せず、イメージサイズを小さく保つ
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションの残りのファイルをコピー
COPY . .

# アプリケーションの起動コマンド
# Flaskアプリをgunicornで起動する一般的なコマンド例
# 'app:app' の部分は、あなたのFlaskアプリケーションのエントリポイントに合わせてください
# 例: main.py に Flask インスタンスが app という変数名で定義されている場合、'main:app'
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:10000", "app:app"]