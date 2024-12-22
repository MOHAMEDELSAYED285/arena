from django.db import models

class Session(models.Model):
    SPORT_CHOICES = [
        ('FOOTBALL', 'Football'),
        ('BASKETBALL', 'Basketball'),
        ('TENNIS', 'Tennis'),
        ('CRICKET', 'Cricket'),
        ('RUGBY', 'Rugby'),
    ]

    LOCATION_CHOICES = [
        ('NORTH', 'North London'),
        ('SOUTH', 'South London'),
        ('EAST', 'East London'),
        ('WEST', 'West London'),
        ('CENTRAL', 'Central London'),
    ]

    sport = models.CharField(max_length=50, choices=SPORT_CHOICES)
    date_time = models.DateTimeField()
    location = models.CharField(max_length=50, choices=LOCATION_CHOICES)
    game_size = models.CharField(max_length=50)  # e.g., "5-a-side"
    price = models.DecimalField(max_digits=6, decimal_places=2)
    total_slots = models.IntegerField()
    booked_slots = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def slots_remaining(self):
        return self.total_slots - self.booked_slots

    class Meta:
        db_table = 'sessions'
        ordering = ['date_time']

    def __str__(self):
        return f"{self.sport} - {self.location} - {self.date_time}"