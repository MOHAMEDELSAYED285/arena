from django.contrib.auth.models import AbstractUser
from django.db import models
import json

class User(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=50, blank=True)
    favourite_sports = models.JSONField(default=list, blank=True)

    def set_favourite_sports(self, sports):
        if isinstance(sports, str):
            try:
                # Try to parse if it's a JSON string
                self.favourite_sports = json.loads(sports)
            except json.JSONDecodeError:
                # If not JSON, convert single sport to list
                self.favourite_sports = [sports]
        elif isinstance(sports, list):
            self.favourite_sports = sports
        else:
            self.favourite_sports = []

    def get_favourite_sports(self):
        return self.favourite_sports