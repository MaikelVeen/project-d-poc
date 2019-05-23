from flask import (
    Blueprint, flash, g, jsonify
)
from flaskr.db import get_db
from flask_expects_json import expects_json

bp = Blueprint('register', __name__, url_prefix='/register')

schema = {
    'type': 'object',
    'properties': {
        'name': {'type': 'string'},
        'email': {'type': 'string'},
        'phone': {'type': 'string'}
    },
    'required': ['email', 'name']
}

# This method will give a 400 code if not given json as parameter
@bp.route('/post', methods=['POST'])
@expects_json(schema)
def register_post():
  print(g.data)

  # TODO generate user_id
  # TODO save the data to the database file
  # TODO generate a QR code 
  # TODO send email to user
  
  response_dict = dict([('status', False)])
  response = jsonify(response_dict)
  return response, 201