import os
import smtplib
from email.message import EmailMessage 
import imghdr


def send_email(email, name, qr_path):
        # getting OS env's so we don't commit sensitive info to source control
        EMAIL_ADDRESS = os.environ.get('email_address')
        EMAIL_PASS = os.environ.get('email_pass')

        message = EmailMessage()
        message['Subject'] = f"Dear {name}, your registration code for awesome Hotel"
        message['From'] = "Hotel"
        message['To'] = email
        message.set_content(f"Dear {name} your QRCode to check in at the lobby")

        with open(qr_path, 'rb') as f:
                file_data = f.read()
                file_name = f.name 
   
        message.add_attachment(file_data, maintype='image', 
                subtype='file_type',filename=file_name)

        # connecting to gmail smtp mail server
        server = smtplib.SMTP_SSL('smtp.gmail.com:465')
        server.login(EMAIL_ADDRESS, EMAIL_PASS)
        server.send_message(message)
        server.quit()