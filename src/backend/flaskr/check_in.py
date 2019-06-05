from flask import (
    Blueprint, flash, g, jsonify
)
from flaskr.db import get_db
from flask_expects_json import expects_json
import base64


bp = Blueprint('checkin', __name__, url_prefix='/check')

image_schema = {
    'type': 'object',
    'properties': {
        'id': {'type': 'string'},
        'image_string': {'type': 'string'},
    },
    'required': ['id', 'image_string']
}

qr_schema = {
    'type': 'object',
    'properties': {
        'id': {'type': 'string'}
    },
    'required': ['id']
}


@bp.route('/qr', methods=['POST'])
@expects_json(qr_schema)
def check_qr():
    db = get_db()
    result = db.execute('SELECT * FROM user WHERE id = ? ',
                        (g.data['id'],)).fetchone()

    status = False
    name = ''
    if result is not None:
        status = True
        name = result['name']

    response_dict = dict(
        [('valid', status), ('name', name), ('id', g.data['id'])])
    response = jsonify(response_dict)
    return response, 200


@bp.route('/image', methods=['POST'])
@expects_json(image_schema)
def send_image():
    imgdata = base64.urlsafe_b64decode(g.data['image_string'])
    filename = (f"{g.data['id']}.jpeg")

    with open(filename, 'wb') as f:
        f.write(imgdata)
    return "Succes"
