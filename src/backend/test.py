from unittest import TestCase, mock, main
import mailer
import register
import recog
import check_in


class TestMailer(unittest.TestCase):

    def test_send_email(self):
        # The jpeg is a created QR code this is one that I created for the purpose of this test so if you would run this you would first need to create a QRCode and paste the filename in here. also
        # needs to be in the same filepath as the test.py file
        self.assertIsNone(mailer.send_email("y.jethoe@hotmail.com", "Rajiv", '4f487414cdf44d47ac0378f1fbff9132.jpg'))

class TestRegister(unittest.TestCase):
    
    def test_register_post(self):
        # TODO Register_post unittest
        

    def test_handle_email(self):
        # The jpeg is a created QR code this is one that I created for the purpose of this test so if you would run this you would first need to create a QRCode and paste the filename in here. also
        # needs to be in the same filepath as the test.py file
        self.assertIsNone(register.send_email("y.jethoe@hotmail.com", "Test Person", "4f487414cdf44d47ac0378f1fbff9132.jpg"))
        pass

class TestRecog(unittest.TestCase):
    def test_amazon(self,):
        # TODO amazon unittest
        pass

class TestCheck_in(unittest.TestCase):
    def test_check_qr(self):
        # TODO check_qr unittest
        pass

    def test_send_image(self):
        # TODO send_image unittest
        pass

if __name__ == '__main__':
    unittest.main() 