from flask import (
    Blueprint, flash, g, jsonify
)
from flaskr.db import get_db
from flask_expects_json import expects_json
from pathlib import Path
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

        # Assign room to checked in user
        db.execute('INSERT INTO userRoom (user_id) VALUES (?)',
                   (g.data['id'],))
        db.commit()

    response_dict = dict(
        [('valid', status), ('name', name), ('id', g.data['id'])])
    response = jsonify(response_dict)
    return response, 200


@bp.route('/image', methods=['POST'])
@expects_json(image_schema)
def send_image():
    imgdata = base64.urlsafe_b64decode(g.data['image_string'])

    data_folder = Path("images/user_faces/")
    path_name = data_folder / (f"{g.data['id']}.jpeg")
    Path("images/user_faces").mkdir(parents=False, exist_ok=True)
    status = False

    db = get_db()

    try:
        with open(path_name, 'wb') as f:
            f.write(imgdata)

        # Assign room to checked in user
        db.execute('UPDATE user SET hasFace = 1 WHERE id = ?',
                   (g.data['id'],))
        db.commit()

        status = True

        result = db.execute('SELECT roomNumber FROM userRoom WHERE user_id = ?',(g.data['id'],)).fetchone()
        if result is None:
            raise Exception

        response_dict = dict([('valid', status),('roomNumber',result[0])])
        response = jsonify(response_dict)
        return response, 200

    except Exception as e:
        print(f"Encountered exception during image saving: {e}")
        response_dict = dict([('valid', status)])
        response = jsonify(response_dict)
        return response, 500
