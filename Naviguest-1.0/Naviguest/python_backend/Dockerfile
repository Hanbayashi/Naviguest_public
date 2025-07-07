# ... (apt-get install の後) ...

# requirements.txt をコピーし、依存関係をインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Gunicornが正しくインストールされたか確認するコマンドを追加
RUN gunicorn --version
# または、より確実な方法
RUN python -c "import gunicorn"
# 上記のコマンドがエラーなく実行されれば、gunicornはインストールされています。

# アプリケーションの残りのファイルをコピー
COPY . .

# アプリケーションの起動コマンド
CMD ["python", "-m", "gunicorn", "-w", "4", "-b", "0.0.0.0:10000", "app:app"]