from rest_framework import serializers
from ..models.session import Session

class SessionSerializer(serializers.ModelSerializer):
    slots_remaining = serializers.IntegerField(read_only=True)

    class Meta:
        model = Session
        fields = ('id', 'sport', 'date_time', 'location', 'game_size', 
                 'price', 'total_slots', 'booked_slots', 'slots_remaining')