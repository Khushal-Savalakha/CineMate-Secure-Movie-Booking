from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='user-signup'),
    path('login/', views.login, name='user-login'),
]
