# backend/api/views/venue_owner_views.py
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from ..serializers import VenueOwnerSerializer
import logging

logger = logging.getLogger(__name__)

class VenueOwnerView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            logger.info(f"Received data: {request.data}")
            serializer = VenueOwnerSerializer(data=request.data)
            
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'message': 'Venue owner request submitted successfully',
                    'data': serializer.data
                }, status=status.HTTP_201_CREATED)
            
            logger.error(f"Validation errors: {serializer.errors}")
            return Response(
                {'errors': serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.error(f"Error processing request: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )