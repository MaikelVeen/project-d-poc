import os
import smtplib
from email.message import EmailMessage 
import imghdr
from flaskr.db import get_db


def send_email(email, name, qr_code):
        # getting OS env's so we don't commit sensitive info to source control
        EMAIL_ADDRESS = os.environ.get('email_address')
        EMAIL_PASS = os.environ.get('email_pass')

        message = EmailMessage()
        message['Subject'] = name
        message['From'] = "Rajivrocks"
        message['To'] = email
        message.set_content("Hello! :3")

        message.add_attachment(file_data, maintype='image', 
                subtype='file_type',filename=file_name)

        # connecting to gmail smtp mail server
        server = smtplib.SMTP_SSL('smtp.gmail.com:465')
        server.login(EMAIL_ADDRESS, EMAIL_PASS)
        server.send_message(message)
        server.quit()
        
        print("Email sent!")
        