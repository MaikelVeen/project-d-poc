from flask import (
    Blueprint, flash, g, jsonify
)
from flaskr.db import get_db
from flaskr.mailer import send_email
from flask_expects_json import expects_json
from pathlib import Path
from threading import Thread
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

    db.execute(
        'INSERT INTO user (id, name, email, phone) VALUES (?, ?, ?, ?)',
        (user_id, user_data['name'],
         user_data['email'], user_data['phone'])
    )
    db.commit()

    # Generate path name for qr image
    data_folder = Path("images/")
    path_name = data_folder / f"{user_id}.jpg"
    Path("images/").mkdir(parents=False, exist_ok=True)

    # Generate the qr code
    qr_img = qrcode.make(user_id)
    qr_img.save(path_name)

    # Create email thread
    email_thread = Thread(target=handle_email, args=(
        user_data['email'], user_data['name'], path_name,))
    email_thread.start()

    response_dict = dict([('status', True)])
    response = jsonify(response_dict)
    return response, 201


def handle_email(email, name, qr_path):
    # Send email with qr code to user
    try:
        print(f"Attempting to email {email}")
        send_email(email, name, qr_path)
    except Exception as e:
        print(f"Encountered exception during email: {e}")
        print("Silently continiuing")
