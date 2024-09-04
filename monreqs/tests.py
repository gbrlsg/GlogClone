from django.test import TestCase
from django.core.management import call_command

class MonReqTests(TestCase):
    
    def test_populate_commad(self):
        call_command("populate_monreqs_db")
        
