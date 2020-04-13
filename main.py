import json
import flask
import numpy as np
import cv2
from board_capture import capture_solve


def solve_board(request):
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return '', 204, headers

    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
    }

    r = request
    img = cv2.imdecode(np.fromstring(r.files['image'].read(), np.uint8), cv2.IMREAD_UNCHANGED)
    solved = capture_solve(img)

    res = json.dumps(solved.tolist())
    return res, 200, headers
