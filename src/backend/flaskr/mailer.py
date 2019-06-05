import os
import smtplib
from email.message import EmailMessage
import imghdr
from flaskr.db import get_db


def send_email(email, name, qr_code):
    # getting OS env's so we don't commit sensitive info to source control
    EMAIL_USER = os.environ.get('EMAIL_USER')
    EMAIL_PASS = os.environ.get('EMAIL_PASSWORD')

    message = EmailMessage()
    message['Subject'] = f"Hi {name}, this is your registration QR Code for lobby checkin"
    message['To'] = email
    message.set_content("QR CODE should be here")

    # message.add_attachment(file_data, maintype='image',
    #      subtype='file_type',filename=file_name)

    # connecting to gmail smtp mail server
    server = smtplib.SMTP_SSL('smtp.gmail.com:465')
    server.login(EMAIL_USER, EMAIL_PASS)
    server.send_message(message)
    server.quit()

    print(f"Email sent succesfully to {email}")
