# Project D: Emerging Technologies Proof of Concept 

In the CMI-wide project Emerging Media/Emerging Technologies, the technical creativity and research methods of students are matched with companies that are interested in research and development with the new technology. 

Imagine never having to use a key or NFC card to enter a room in a hotel. That's what this proof of concept is all about. The 'Keyless Door Entry System' uses facial recognition to enable entry to rooms in the hospitality branch. The proof of concept includes resevering rooms, a lobby registration demo and door entry demo. 

---

# Installation and setup

When using MacOS or Linux you can you use the bash script in the bin folder to run the backend and frontend. You can use the following commands:

```
bash ./bin/run_frontend.sh 
bash ./bin/run_backend.sh 
```

When using Windows, please follow the manual installation steps given below.


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


### Email setup

To get QRCode's send to you via email there are a few steps you have to undertake before it will actually send emails to you.
First of all you need a Gmail account. If you don't have a gmail account you need to make one. 

After that, you need to go to this link: https://myaccount.google.com/lesssecureapps and allow "Less secure apps" to log in to your gmail account. If you don't do this it will not work.
If you have 2-step verification enabled you need to go to this address: https://myaccount.google.com/apppasswords (This address only works if you have 2-step enabled) and create an app passowrd for the
machine you work on. In this case you need to select "Mail" in the "Select app" drop down menu and select your device in the "Select device" drop down menu. After that you click "Generate", make sure to write this password down because you CAN NOT view this password again after you click done.

After all this you need to make two OS variables one called "email_address" and the other called "email_pass". The address value should contain your gmail address and your password should contain either your real password for your account or in the case of 2-step verification, the generated password that you wrote down. When this is done you need to reboot your machine for your OS to load the variables.
(Atleast in the case of windows)

Windows OS variables: https://helpdeskgeek.com/how-to/create-custom-environment-variables-in-windows/
Mac OS variables: https://medium.com/@himanshuagarwal1395/setting-up-environment-variables-in-macos-sierra-f5978369b255

If every step has been walked through properly you should be able to use the mail module.

Why we do this:
    
    We do this because its a good practice to store sensitive data outside of the view of source control and of course, it's not wise to have passwords in plaintext in your files.

That concludes the email setup

### Amazon command line tools

The Amazon rekognition api requires a working connection. For this it is necessary to install AWS CLI in your environment. With AWS CLI it is possible to make a connection with the api, so that you can make api calls carelessly.

Python on windows
`C:\> pip install awscli`

Python on MAC OS
`$ pip install awscli --upgrade --user`

After AWS CLI has been installed, it is time to configure it so that a connection can be created. Because the AWS Keys are linked to a personal credit card, we prefer not to share the keys online. If a teacher wants to use this, please contact us and we will share the keys with you once.

```
$ aws configure
AWS Access Key ID [None]: Please Contact us for the Key ID
AWS Secret Access Key [None]: Please Contact us for the Acces Key
Default region name [None]: us-west-2
Default output format [None]: ENTER
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

To run a ReactJs application you need NodeJS. 
Download NodeJs here: https://nodejs.org/en/

NodeJs comes with npm a package manager which is needed to use ReactJs.

After you installed Node you need to run the following commands in the hospitallity-app folder: 

```
npm install 
npm start
```
---

# Documentation Links

This section features links to relevant documentation.

* [Flask Tutorial](http://flask.pocoo.org/docs/1.0/tutorial/#tutorial)
* [Flask API documentation](http://flask.pocoo.org/docs/1.0/api/#api)

# Contributing Guidelines

Each project member works in seperate branches. Please name the branches accordingly to the feature you are working on. Such as 
feat/registration e.g. Once a feature is done or partially implented start a pull request to the master branch. Other team members will review the changes made.
