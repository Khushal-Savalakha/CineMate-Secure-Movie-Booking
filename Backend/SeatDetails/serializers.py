from rest_framework import serializers
from .models import MovieAvailability

class MovieAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model=MovieAvailability
        fields=['movie_name','date','time_slot','seat_status']