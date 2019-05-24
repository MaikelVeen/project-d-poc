from flask import (
    Blueprint, flash, g, jsonify
)
from flaskr.db import get_db
from flask_expects_json import expects_json

bp = Blueprint('recog', __name__, url_prefix='/recog')

# TODO Expand Stub