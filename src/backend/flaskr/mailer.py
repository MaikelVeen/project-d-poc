import os
import smtplib

name = "Rajiv"

EMAIL_ADDRESS = os.environ.get('email_address')
EMAIL_PASS = os.environ.get('email_pass')

def send_email(subject, msg):
     
        server = smtplib.SMTP('smtp.gmail.com:587')
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(EMAIL_ADDRESS, EMAIL_PASS)
        message = 'subject: {}\n\n{}' .format(subject, msg)
        server.sendmail(EMAIL_ADDRESS, "y.jethoe@hotmail.com", message)
        server.quit()
        print("Email sent!")
    
        

subject = (name) 
msg = "Hope this works ;)"
send_email(subject, msg)
