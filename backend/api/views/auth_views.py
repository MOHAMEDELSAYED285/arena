from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from ..serializers import UserSerializer

User = get_user_model()

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            email = request.data.get('email')
            password = request.data.get('password')
            username = request.data.get('username')
            
            # Check if user already exists
            if User.objects.filter(email=email).exists():
                return Response(
                    {'error': 'User with this email already exists'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            if User.objects.filter(username=username).exists():
                return Response(
                    {'error': 'Username is already taken'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Create user
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password
            )
            
            # Generate token
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'token': str(refresh.access_token),
                'refresh': str(refresh),
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            print(f"Registration error: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            email = request.data.get('email')
            password = request.data.get('password')
            
            print(f"Login attempt for email: {email}")
            
            # Find user by email
            user = User.objects.filter(email=email).first()
            
            if not user:
                return Response(
                    {'error': 'User not found'}, 
                    status=status.HTTP_404_NOT_FOUND
                )

            print(f"Found user: {user.username}")
            
            # Authenticate using username and password
            authenticated_user = authenticate(
                request,
                username=user.username,
                password=password
            )
            
            print(f"Authentication result: {'Success' if authenticated_user else 'Failed'}")

            if authenticated_user:
                refresh = RefreshToken.for_user(authenticated_user)
                return Response({
                    'token': str(refresh.access_token),
                    'refresh': str(refresh),
                    'user': UserSerializer(authenticated_user).data
                })
            
            return Response(
                {'error': 'Invalid credentials'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        except Exception as e:
            print(f"Login error: {str(e)}")
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)