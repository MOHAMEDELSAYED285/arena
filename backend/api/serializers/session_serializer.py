from rest_framework import serializers
from ..models.session import Session

class SessionSerializer(serializers.ModelSerializer):
    slots_remaining = serializers.IntegerField(read_only=True)
    match_score = serializers.FloatField(read_only=True, required=False)

    class Meta:
        model = Session
        fields = (
            'id', 
            'sport', 
            'date_time', 
            'location', 
            'game_size', 
            'price', 
            'total_slots', 
            'booked_slots', 
            'slots_remaining',
            'match_score'
        )

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['slots_remaining'] = instance.total_slots - instance.booked_slots
        return data