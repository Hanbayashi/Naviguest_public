from http.server import BaseHTTPRequestHandler
import json

# !!! 注意 !!!: VercelのServerless Functionはステートレスです。
# この '_last_received_number' はリクエストごとに初期化されます。
# 永続的な状態が必要な場合はデータベースなどを利用してください。
_last_received_number = 0 

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        global _last_received_number 

        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        request_data = json.loads(post_data.decode('utf-8'))

        number = request_data.get('number') # 'number'キーで数値を受け取る
        if number is None:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Number not provided"}).encode('utf-8'))
            return

        try:
            numeric_value = float(number)
            _last_received_number = numeric_value # この変更は次のリクエストには引き継がれません

            # 例として、受け取った数値をログに出力
            print(f"Received number: {numeric_value}")
            calculated_value = numeric_value * 10 # 何か計算

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()

            response_data = {
                "status": "success",
                "received_number_on_api": numeric_value,
                "calculated_value": calculated_value
            }
            self.wfile.write(json.dumps(response_data).encode('utf-8'))

        except ValueError:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Invalid number format"}).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()