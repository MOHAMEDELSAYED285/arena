from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Case, When, F, FloatField, Value
from ..models import Session
from ..serializers import SessionSerializer

class QuizResponseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Get quiz data
            favourite_sports = request.data.get('favouriteSports', [])
            
            # Get sessions with available slots
            sessions = Session.objects.filter(
                total_slots__gt=F('booked_slots')
            )

            # Filter by sports if provided
            if favourite_sports:
                sports_upper = [sport.upper() for sport in favourite_sports]
                sessions = sessions.filter(sport__in=sports_upper)

            # Calculate match score
            sessions = sessions.annotate(
                match_score=Case(
                    When(
                        sport__in=[s.upper() for s in favourite_sports] if favourite_sports else [],
                        then=Value(1.0)
                    ),
                    default=Value(0.0),
                    output_field=FloatField(),
                )
            )

            # Order by match score and date
            sessions = sessions.order_by('-match_score', 'date_time')
            
            serializer = SessionSerializer(sessions, many=True)
            
            return Response({
                'recommendations': serializer.data
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            print(f"Error in quiz response: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )