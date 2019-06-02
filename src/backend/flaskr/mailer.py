import smtplib
import os

email = os.environ.get('email_address')
pwd = os.environ.get('email_pass')

def send_email(subject, msg):
     
        server = smtplib.SMTP('smtp.gmail.com:587')
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(email, pwd)
        message = 'subject: {}\n\n{}'.format(subject, msg)
        server.sendmail("rajivrockshd@gmail.com", "y.jethoe@hotmail.com", message)
        server.quit()
        print("Email sent!")
    
        

subject = "test" 
msg = "Hope this works ;)"
send_email(subject, msg)