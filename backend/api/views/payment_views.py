from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
import stripe
from django.conf import settings
from ..models import Session

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreatePaymentIntentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            session_id = request.data.get('session_id')
            if not session_id:
                return Response(
                    {'error': 'Session ID is required'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Get session
            try:
                session = Session.objects.get(id=session_id)
            except Session.DoesNotExist:
                return Response(
                    {'error': 'Session not found'}, 
                    status=status.HTTP_404_NOT_FOUND
                )

            # Check if there are available slots
            if session.slots_remaining <= 0:
                return Response(
                    {'error': 'No slots available for this session'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Create payment intent
            intent = stripe.PaymentIntent.create(
                amount=int(session.price * 100),  # Convert to cents
                currency='gbp',
                metadata={
                    'session_id': session_id,
                    'user_id': request.user.id,
                },
            )

            return Response({
                'clientSecret': intent.client_secret
            })

        except stripe.error.StripeError as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )