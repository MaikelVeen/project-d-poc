import os
import smtplib
from email.message import EmailMessage 
import imghdr
from flaskr.db import get_db


def send_email(email, name, qrcode):
        # getting OS env's so we don't commit sensitive info to source control
        EMAIL_ADDRESS = os.environ.get('email_address')
        EMAIL_PASS = os.environ.get('email_pass')

        message = EmailMessage()
        message['Subject'] = f"Hi {name}"
        message['From'] = "Hotel"
        message['To'] = email
        message.set_content(f"Here you go {name} your QRCode to check in")

        with open('yolo.jpg', 'rb') as f:
                file_data = f.read()
                file_type = imghdr.what(f.name)
                file_name = f.name 
                print(file_name)
                print(file_type)
        
        message.add_attachment(file_data, maintype='image', 
                subtype='file_type',filename=file_name)

        # connecting to gmail smtp mail server
        server = smtplib.SMTP_SSL('smtp.gmail.com:465')
        server.login(EMAIL_ADDRESS, EMAIL_PASS)
        server.send_message(message)
        server.quit()
        
        #print("Email sent!")