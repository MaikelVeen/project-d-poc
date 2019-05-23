# Project D: Emerging Technologies Proof of Concept 

In the CMI-wide project Emerging Media/Emerging Technologies, the technical creativity and research methods of students are matched with companies that are interested in research and development with the new technology. 

This repository consist of the code of the d
## Concept Description

Imagine never having to use a key or NFC card to enter a room in a hotel. That's what this proof of concept is all about. The 'Keyless Door Entry System' uses facial recognition to enable entry to rooms in the hospitality branch. The proof of concept includes resevering rooms, a lobby registration demo and door entry demo. 

## Architecture Overview

TODO

---

# Installation and setup

## Backend installation and setup

This backend is built using Python. It includes facial recognition modules and more. The backend is a web api that is built using Flask.

1. First make sure you have a compatible version of Python installed. The latest Python 3 version is recommended. 

2. Install Flask. Instructions can be found [here](http://flask.pocoo.org/docs/1.0/installation/#installation)

3. Install other dependencies for the project inside the virtual environment. These can be found in requirements.txt in the root folder of this project.

### Running the backend

The backend dependencies and framework (Flask) are installed within an virtual environment. You can learn more about packages, pip and virtual environments [here](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/).

To run the backend you first have to make sure the virtual environment is running. To activate the corresponding environment:

'. venv/bin/activate'

And on Windows:

'venv\Scripts\activate'

After you have actiavted the environment, you need to run the following commands:

'''
export FLASK_APP=flaskr
export FLASK_ENV=development
flask run
'''

For Windows:

'''
set FLASK_APP=flaskr
set FLASK_ENV=development
flask run
'''

## Frontend installation and setup

TODO

---

# Documentation Links

This section features links to relevant documentation.

* [Flask Tutorial](http://flask.pocoo.org/docs/1.0/tutorial/#tutorial)
* [Flask API documentation](http://flask.pocoo.org/docs/1.0/api/#api)

# Contributing Guidelines

Each project member works in seperate branches. Please name the branches accordingly to the feature you are working on. Such as 
feat/registration e.g. Once a feature is done or partially implented start a pull request to the master branch. Other team members will review the changes made.
