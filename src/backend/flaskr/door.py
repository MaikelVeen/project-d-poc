from flask import (
    Blueprint, flash, g, jsonify
)
from flaskr.db import get_db
from flask_expects_json import expects_json

bp = Blueprint('door', __name__, url_prefix='/door')


@bp.route('/numbers', methods=['GET'])
def check_qr():
    db = get_db()
    rows = db.execute('SELECT roomNumber FROM userRoom').fetchall()
    data = list()
    for row in rows:
      data.append(row[0])

    return jsonify({'result':data}), 200

@bp.route('/open', methods=['POST'])
def open():
    response = 'Joe'
    return response, 200