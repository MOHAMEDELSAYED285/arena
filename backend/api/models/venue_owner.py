# backend/api/models/venue_owner.py
from django.db import models

# backend/api/models/venue_owner.py
class VenueOwner(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    subject = models.CharField(max_length=200, blank=True, null=True)  # Make sure optional fields are marked
    phone = models.CharField(max_length=20, blank=True, null=True)
    venue_details = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('PENDING', 'Pending'),
            ('CONTACTED', 'Contacted'),
            ('APPROVED', 'Approved'),
            ('REJECTED', 'Rejected')
        ],
        default='PENDING'
    )

    class Meta:
        db_table = 'venue_owners'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.venue_details.split(',')[0]}"