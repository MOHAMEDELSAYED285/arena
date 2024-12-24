from django.contrib.auth.models import AbstractUser
from django.db import models
import json

class User(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=50, blank=True)
    favourite_sports = models.JSONField(default=list, blank=True)
    
    # New fields for quiz data
    quiz_preferences = models.JSONField(default=dict, blank=True)
    last_quiz_date = models.DateTimeField(null=True, blank=True)
    recommended_sessions = models.ManyToManyField('Session', related_name='recommended_for', blank=True)
    gender = models.CharField(max_length=20, blank=True)

    def set_quiz_preferences(self, preferences):
        self.quiz_preferences = preferences
        self.save()

    def get_quiz_preferences(self):
        return self.quiz_preferences

    def set_favourite_sports(self, sports):
        if isinstance(sports, str):
            try:
                self.favourite_sports = json.loads(sports)
            except json.JSONDecodeError:
                self.favourite_sports = [sports]
        elif isinstance(sports, list):
            self.favourite_sports = sports
        else:
            self.favourite_sports = []

    def get_favourite_sports(self):
        return self.favourite_sports