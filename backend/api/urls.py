# backend/api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.auth_views import LoginView, UserView, RegisterView
from .views.session_views import SessionViewSet
from .views.quiz_views import SaveQuizPreferencesView, GetUserPreferencesView
from .views.payment_views import CreatePaymentIntentView
from .views.venue_owner_views import VenueOwnerView

router = DefaultRouter()
router.register(r'sessions', SessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', LoginView.as_view(), name='auth_login'),
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('auth/user/', UserView.as_view(), name='auth_user'),
    path('create-payment-intent/', CreatePaymentIntentView.as_view(), name='create-payment-intent'),
    path('quiz-preferences/', SaveQuizPreferencesView.as_view(), name='quiz-preferences'),
    path('quiz-preferences/user/', GetUserPreferencesView.as_view(), name='user-preferences'),
    path('venue-owners/', VenueOwnerView.as_view(), name='venue-owners'),
]