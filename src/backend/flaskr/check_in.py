from flask import (
    Blueprint, flash, g, jsonify
)
from flaskr.db import get_db
from flask_expects_json import expects_json
import base64


bp = Blueprint('checkin', __name__, url_prefix='/check')

schema = {
    'type': 'object',
    'properties': {
        'id': {'type': 'string'},
        'image_string': {'type': 'string'},
    },
    'required': ['id', 'image_string']
}


@bp.route('/qr', methods=['POST'])
@expects_json(schema)
def check_qr():
    return 500


@bp.route('/image', methods=['POST'])
@expects_json(schema)
def send_image():
    imgdata = base64.urlsafe_b64decode(g.data['image_string'])
    filename = (f"{g.data['id']}.jpeg")

    with open(filename, 'wb') as f:
        f.write(imgdata)
    return "Succes"
