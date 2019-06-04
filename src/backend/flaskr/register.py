from flask import (
    Blueprint, flash, g, jsonify
)
from flaskr.db import get_db
from flaskr.mailer import send_email
from flask_expects_json import expects_json
import uuid
import qrcode

bp = Blueprint('register', __name__, url_prefix='/register')

schema = {
    'type': 'object',
    'properties': {
        'name': {'type': 'string'},
        'email': {'type': 'string'},
        'phone': {'type': 'string'}
    },
    'required': ['email', 'name', 'phone']
}


# This method will give a 400 code if not given json as parameter
@bp.route('/post', methods=['POST'])
@expects_json(schema)
def register_post():
    user_data = g.data
    db = get_db()

    # Generate a unique user id as 32-character hexadecimal string
    user_id = uuid.uuid4().hex
    user_data.update([('id', user_id)])

    db.execute(
        'INSERT INTO user (id, name, email, phone) VALUES (?, ?, ?, ?)',
        (user_data['id'], user_data['name'],
         user_data['email'], user_data['phone'])
    )
    db.commit()

    # Temporary save the file to show it works
    qr_img = qrcode.make(user_id)
    qr_img.save(f"{user_id}.jpg")
    send_email(user_data['email'], user_data['name'], qr_img)

    response_dict = dict([('status', False)])
    response = jsonify(response_dict)
    return response, 201
