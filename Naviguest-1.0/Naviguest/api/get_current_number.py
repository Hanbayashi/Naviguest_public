from http.server import BaseHTTPRequestHandler
import json

# !!! 注意 !!!: Serverless Functionはステートレスなので、
# ここで取得する値は、更新時に設定された値ではなく、常に初期値（またはDBからの取得値）になります。
_current_number_for_display = 0 # 例として常に0を返す

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

        response_data = {
            "current_number": _current_number_for_display, # デモなので常に0
            "last_calculated_result": _current_number_for_display * 10 # デモなので常に0
        }
        self.wfile.write(json.dumps(response_data).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()