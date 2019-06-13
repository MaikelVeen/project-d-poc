import boto3
from flask import (
    Blueprint, flash, g, jsonify
)
from flaskr.db import get_db
from flask_expects_json import expects_json
from pathlib import Path
import base64
import uuid

bp = Blueprint('door', __name__, url_prefix='/door')
THRESHOLD = 99
LOWER_THRESHOLD = 90

IMAGE_SCHEMA = {
    'type': 'object',
    'properties': {
        'image_string': {'type': 'string'},
        'room': {'type': 'number'}
    },
    'required': ['room', 'image_string']
}

@bp.route('/numbers', methods=['GET'])
def get_room():
    """Route for getting all room numbers"""
    data = _get_room_numbers()
    return jsonify({'result': data}), 200

@bp.route('/open', methods=['POST'])
@expects_json(IMAGE_SCHEMA)
def open_door():
    """Route for opening door"""
    image_data = base64.urlsafe_b64decode(g.data['image_string'])
    target_file_path = _save_attempt(image_data)

    user_id = _get_room_user(g.data['room'])
    if user_id is None:
        return None, 500

    source_file_path = _get_source_path(user_id)
    result = _compare(source_file_path, target_file_path)

    response_dict = dict([('upper_threshold', result[0]),('lower_threshold', result[1])])
    response = jsonify(response_dict)
    return response, 200

def _get_room_numbers():
    """ Get array of room numbers with linked user ids """
    db = get_db()
    rows = db.execute('SELECT roomNumber FROM userRoom').fetchall()
    data = list()
    for row in rows:
        data.append(row[0])
    return data


def _save_attempt(image):
    """
    Save the image that was taken at this login attempt

    Args:
        image: the webcam capture received in request

    Returns:
        Path name of saved image file

    Raises:
        ValueError, IOError
    """
    data_folder = Path("images/attempt/")
    Path("images/attempt").mkdir(parents=False, exist_ok=True)
    path_name = data_folder / (f"{uuid.uuid4().hex}.jpeg")

    with open(path_name, 'wb') as f:
        f.write(image)

    return path_name


def _get_room_user(room_number):
    """
    Get the id of the user that is linked to a given room number

    Args:
        room_number: The number of the room

    Returns:
        The user_id linked to the room. If no user_id is found return

    """
    db = get_db()
    result = db.execute(
        'SELECT user_id FROM userRoom WHERE roomNumber = ?', (room_number,)).fetchone()

    if result is None:
        return None
    else:
        return result[0]


def _get_source_path(user_id):
    """ Returns the source file image path based on a user id """
    data_folder = Path("images/user_faces/")
    Path("images/user_faces").mkdir(parents=False, exist_ok=True)
    path_name = data_folder / (f"{user_id}.jpeg")
    return path_name


def _compare(source_file_path, target_file_path):
    """
    Compare the face of attempt to the face saved at checkin
    Essentialy a wrapper for boto3 compare_faces function

    Args:
        source_file_path: path to source file
        target_file_path: path to image current attempt

    Returns:
        Tuple, first item indicates whether similarity is above
        upper threshold. Second item is whether or not lower threshold
        is reached. 

    """
    amazon_client = boto3.client('rekognition')

    image_source = open(source_file_path, 'rb')
    image_target = open(target_file_path, 'rb')

    try:
        response = amazon_client.compare_faces(SimilarityThreshold=0, SourceImage={
                                               'Bytes': image_source.read()}, TargetImage={'Bytes': image_target.read()})
    except:
        return False

    if len(response['FaceMatches']) == 0:
        return False

    similarity = response['FaceMatches'][0]['Similarity']
    print(similarity)

    if similarity > THRESHOLD:
        return (True,False)
    else:
        if similarity < LOWER_THRESHOLD:
            return (False,True)
        else:
            return (False,False)
