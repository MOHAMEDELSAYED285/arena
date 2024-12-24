from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Case, When, F, FloatField, Value
from django.utils import timezone
from ..models import Session, User
from ..serializers import SessionSerializer, UserSerializer

class SaveQuizPreferencesView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            quiz_data = request.data
            
            # Update user profile with quiz data
            user.location = quiz_data.get('location', user.location)
            user.favourite_sports = quiz_data.get('favouriteSports', user.favourite_sports)
            user.phone_number = quiz_data.get('phoneNumber', user.phone_number)
            user.date_of_birth = quiz_data.get('dateOfBirth', user.date_of_birth)
            user.gender = quiz_data.get('gender', '')
            
            # Save quiz preferences
            user.quiz_preferences = quiz_data
            user.last_quiz_date = timezone.now()
            
            user.save()

            # Get recommended sessions based on preferences
            sessions = Session.objects.filter(
                total_slots__gt=F('booked_slots')
            )

            if user.favourite_sports:
                sports_upper = [sport.upper() for sport in user.favourite_sports]
                sessions = sessions.filter(sport__in=sports_upper)

            if user.location:
                sessions = sessions.filter(location=user.location)

            # Calculate match score
            sessions = sessions.annotate(
                match_score=Case(
                    When(
                        sport__in=[s.upper() for s in user.favourite_sports],
                        then=Value(1.0)
                    ),
                    default=Value(0.0),
                    output_field=FloatField(),
                )
            ).order_by('-match_score', 'date_time')

            # Update user's recommended sessions
            user.recommended_sessions.set(sessions[:10])  # Store top 10 recommendations
            
            return Response({
                'user': UserSerializer(user).data,
                'recommendations': SessionSerializer(sessions, many=True).data
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            print(f"Error in quiz preferences: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class GetUserPreferencesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            recommended_sessions = user.recommended_sessions.all()
            
            return Response({
                'preferences': user.quiz_preferences,
                'recommendations': SessionSerializer(recommended_sessions, many=True).data,
                'last_quiz_date': user.last_quiz_date
            })
            
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )