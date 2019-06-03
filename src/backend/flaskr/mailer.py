import os
import smtplib
from email.message import EmailMessage 
import imghdr

name = "Rajiv"
email = "y.jethoe@hotmail.com"

# getting OS env's so we don't commit sensitive info to source control
EMAIL_ADDRESS = os.environ.get('email_address')
EMAIL_PASS = os.environ.get('email_pass')

message = EmailMessage()
message['Subject'] = name
message['From'] = "Rajivrocks"
message['To'] = email
message.set_content("Hello! :3")

# this will be dynamic when finished, I provided a test image, feel free to swap it out with your own, but this one is very cute! x)
with open('2bChibi.png', 'rb') as f:
        file_data = f.read()
        file_type = imghdr.what(f.name)
        file_name = f.name

message.add_attachment(file_data, maintype='image', subtype='file_type', filename=file_name)

def send_email():
        # connecting to gmail smtp mail server
        server = smtplib.SMTP_SSL('smtp.gmail.com:465')
        server.login(EMAIL_ADDRESS, EMAIL_PASS)
        server.send_message(message)
        server.quit()
        print("Email sent!")
    
send_email()