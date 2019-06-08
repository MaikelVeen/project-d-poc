import os
from flask import Flask
from flask_cors import CORS


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite')
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from . import db
    db.init_app(app)

    from . import register
    from . import check_in
    from . import recog
    from . import door

    app.register_blueprint(register.bp)
    app.register_blueprint(check_in.bp)
    app.register_blueprint(recog.bp)
    app.register_blueprint(door.bp)

    return app
