from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly  # Add this
from ..models import Session
from ..serializers import SessionSerializer

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Add this line