import os
from flask import Flask

# Application factory method


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

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

    @app.route('/check_in')
    def check_in():
        # TODO check in routine
        return 'user checked in systems'

    @app.route('/enter')
    def enter():
        # TODO enter room
        return False

    from . import db
    db.init_app(app)

    from . import register
    app.register_blueprint(register.bp)

    return app
