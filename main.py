import json
import flask
import numpy as np
import cv2
from board_capture import capture_solve


def solve_board(request):
    r = request
    img = cv2.imdecode(np.fromstring(r.files['image'].read(), np.uint8), cv2.IMREAD_UNCHANGED)

    solved = capture_solve(img)

    res = json.dumps(solved.tolist())
    res = flask.jsonify(res)
    res.headers.set('Access-Control-Allow-Origin', '*')
    res.headers.set('Access-Control-Allow-Methods', 'POST')
    return res
