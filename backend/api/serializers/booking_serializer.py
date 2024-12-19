from rest_framework import serializers
from ..models.booking import Booking

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('id', 'user', 'session', 'status', 'created_at')