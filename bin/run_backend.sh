#!/bin/bash
echo "Starting Backend"
cd src/backend/

if [ -d "venv" ] 
then
    echo "Activating virtual environment" 
    . venv/bin/activate
else
    echo "venv folder not detected"
    echo "Installing backend server"

    python3 -m venv venv
    echo "Activating virtual environment" 
    . venv/bin/activate
    pip install -r requirements.txt
fi

export FLASK_APP=flaskr
export FLASK_ENV=development

if [ -d "instance" ] 
then
    echo "Database file detected"
else
    flask init-db
fi

flask run


