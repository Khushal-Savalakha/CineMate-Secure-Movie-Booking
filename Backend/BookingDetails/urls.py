# urls.py
from django.urls import path
from .views import get_csrf_token, insert_booking_data, search_booking_data

urlpatterns = [
    path('csrf/', get_csrf_token, name='get_csrf_token'),
    path('add/', insert_booking_data, name='insert_booking_data'),
    path('search/', search_booking_data, name='search_booking_data'),
]
