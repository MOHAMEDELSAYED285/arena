# backend/api/serializers/venue_owner_serializer.py
from rest_framework import serializers
from ..models import VenueOwner

class VenueOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = VenueOwner
        fields = ('id', 'first_name', 'last_name', 'email', 'subject', 'phone', 'venue_details', 'created_at', 'status')
        read_only_fields = ('created_at', 'status')