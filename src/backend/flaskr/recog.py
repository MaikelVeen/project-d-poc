import boto3
from flask import (
    Blueprint, flash, g, jsonify
)
from flaskr.db import get_db
from flask_expects_json import expects_json

bp = Blueprint('recog', __name__, url_prefix='/recog')

# TODO Expand Stub
#
# Probleem met importen van flaskr bij het uitvoeren van het script
# Zodra je de recog.py buiten de map flaskr plaatst werkt het wel: backend/recog.py i.p.v. backend/flaskr/recog.py


def amazon(source_file, target_file):

    client = boto3.client('rekognition')

    image_source = open(source_file, 'rb')
    image_target = open(target_file, 'rb')

    try:
        response = client.compare_faces(SimilarityThreshold=0,
                                        SourceImage={
                                            'Bytes': image_source.read()},
                                        TargetImage={'Bytes': image_target.read()})
    except:
        return "No Face Detected"

    for faceMatch in response['FaceMatches']:

        confidence = str(faceMatch['Similarity'])

    image_source.close()
    image_target.close()

    print(confidence)
    return confidence
