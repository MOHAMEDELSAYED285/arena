from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Session
from ..serializers import SessionSerializer

class QuizResponseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Get quiz data
            location = request.data.get('location')
            favourite_sports = request.data.get('favouriteSports', [])
            
            # Get recommended sessions
            recommended_sessions = Session.objects.filter(
                location__iexact=location,
                sport__in=[sport.upper() for sport in favourite_sports]
            ).order_by('date_time')
            
            serializer = SessionSerializer(recommended_sessions, many=True)
            
            return Response({
                'recommendations': serializer.data
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )