from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.auth_views import LoginView, UserView, RegisterView  # Add RegisterView
from .views.session_views import SessionViewSet
from .views.quiz_views import QuizResponseView

router = DefaultRouter()
router.register(r'sessions', SessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', LoginView.as_view(), name='auth_login'),
    path('auth/register/', RegisterView.as_view(), name='auth_register'),  # Add this line
    path('auth/user/', UserView.as_view(), name='auth_user'),
    path('quiz-responses/', QuizResponseView.as_view(), name='quiz-responses'),

]