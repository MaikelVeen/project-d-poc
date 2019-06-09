# Project D: Emerging Technologies Proof of Concept 

In the CMI-wide project Emerging Media/Emerging Technologies, the technical creativity and research methods of students are matched with companies that are interested in research and development with the new technology. 

Imagine never having to use a key or NFC card to enter a room in a hotel. That's what this proof of concept is all about. The 'Keyless Door Entry System' uses facial recognition to enable entry to rooms in the hospitality branch. The proof of concept includes resevering rooms, a lobby registration demo and door entry demo. 

---

# Installation and setup
## Backend
### Backend installation and setup

This backend is built using Python. It includes facial recognition modules and more. The backend is a web api that is built using Flask.

1. First make sure you have a compatible version of Python installed. The latest Python 3 version is recommended. 

2. Install Flask. Instructions can be found [here](http://flask.pocoo.org/docs/1.0/installation/#installation)

3. Install other dependencies for the project inside the virtual environment. These can be found in requirements.txt in the root folder of this project. You can do this by runnning this command in the virtual environment: `pip install -r requirements.txt` Please note that this is a destructive operation and will also drop all tables if a database is already present.

### Environment setup

You want to make sure that your IDE has the virtual environment as Python intpreter. In Visual Studio code you can do this by adding some settings in `.vscode/settings.json`

Add the following lines to this file:

```json
{
  "python.venvPath": "${workspaceFolder}/src/backend/venv",
  "python.pythonPath": "${workspaceFolder}/src/backend/venv/bin/python3",
  "python.linting.pylintEnabled": true,
  "python.linting.pep8Enabled": true,
  "python.linting.enabled": true
}
```

### Running the backend

The backend dependencies and framework (Flask) are installed within an virtual environment. You can learn more about packages, pip and virtual environments [here](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/).

To run the backend you first have to make sure the virtual environment is running. To activate the corresponding environment:

`. venv/bin/activate`

And on Windows:

`venv\Scripts\activate`

Before actually running the backend, you need to initialize the database. You can do this by running this command (inside the virtual environment):

`flask init-db`

After you have activated the environment and intitialised the database, you need to run the following commands to start up the backend process:

```
export FLASK_APP=flaskr
export FLASK_ENV=development
flask run
```

For Windows:

```
set FLASK_APP=flaskr
set FLASK_ENV=development
flask run
```

## Frontend 

TO run a ReactJs application you need NodeJS. 
Download NodeJs here: https://nodejs.org/en/

NodeJs comes with npm a package manager which is needed to use ReactJs.

After you installed Node you need to run the following commands in the hospitallity-app folder: 

```
npm install 
npm start
```


---
# API Documentation
---
# Register a new guest

Registers a new user to the system. User gets saved to database and user is sent an email with a QR Code that gets generated

**URL** : `/register/post`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

**Data constraints**

Provide name, email and phone number 


**Data example** All fields must be sent.

```json
{
	"name":"John Doe",
	"email":"email@test.nl",
	"phone":"0786184910"
}
```

## Success Response

**Condition** : If everything is OK 

**Code** : `201 CREATED`

**Content example**

```json
{
    "id": 123,
    "name": "Build something project dot com",
    "url": "http://testserver/api/accounts/123/"
}
```

## Error Responses

**Condition** : If fields are missed or body is not json

**Code** : `400 BAD REQUEST`

# Check a QR Code

Checks if a given QR code corresponds to a valid user id in the database. On properly formed request the server should always return 200 OK. Use json field 'valid' to determine if user id is valid

**URL** : `/check/qr`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

**Data constraints**

Provide id scanned in front end


**Data example** All fields must be sent.

```json
{
	"id":"6097fed738974d16889cf13df1b9"
}
```

## Success Response

**Condition** : If everything is OK 

**Code** : `200 OK`

**Content examples**

```json
{
    "id": "6097fed738974d16889cf13df1b964f6",
    "name": "John Doe",
    "valid": true
}

{
    "id": "6097fed738974d16889cf13df1b964",
    "name": "",
    "valid": false
}
```

## Error Responses

**Condition** : If fields are missed or body is not json

**Code** : `400 BAD REQUEST`

**Condition** : Internal server error

**Code** : `500 INTERNAL SERVER ERROR`

---

# Documentation Links

This section features links to relevant documentation.

* [Flask Tutorial](http://flask.pocoo.org/docs/1.0/tutorial/#tutorial)
* [Flask API documentation](http://flask.pocoo.org/docs/1.0/api/#api)

# Contributing Guidelines

Each project member works in seperate branches. Please name the branches accordingly to the feature you are working on. Such as 
feat/registration e.g. Once a feature is done or partially implented start a pull request to the master branch. Other team members will review the changes made.
