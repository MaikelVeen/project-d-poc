import unittest
import mailer
import register

class TestMailer(unittest.TestCase):

    def test_send_email(self):
        self.assertEqual(mailer.send_email("y.jethoe@hotmail.com", "Rajiv", '4f487414cdf44d47ac0378f1fbff9132.jpg'), None)



if __name__ == '__main__':
    unittest.main() 