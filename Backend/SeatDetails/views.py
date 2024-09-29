from rest_framework import generics, status
from rest_framework.response import Response
from .models import MovieAvailability
from .serializers import MovieAvailabilitySerializer
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
@api_view(['POST'])
def add_seats_data(request):
    serializer = MovieAvailabilitySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def seats_data(request):
    print(request.data)
    movie_name = request.data.get('movie_name')
    date = request.data.get('date')
    time_slot = request.data.get('time_slot')

    # Check if movie_name, date, or time_slot are missing
    if not movie_name or not date or not time_slot:
        return Response({'msg': 'movie_name, date, and time_slot are required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Fetch movie availability if it exists
        slot = MovieAvailability.objects.get(movie_name=movie_name, date=date, time_slot=time_slot)
        serializer = MovieAvailabilitySerializer(slot)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except MovieAvailability.DoesNotExist:
        # If the movie availability is not found, return a default seat status with 24 "1"s
        seat_status = ','.join(['1'] * 24)  # 24 "1"s separated by commas
        return Response({
            'movie_name': movie_name,
            'date': date,
            'time_slot': time_slot,
            'seat_status': seat_status  # Returning seat status with 24 "1"s
        }, status=status.HTTP_200_OK)

@api_view(['PUT'])
def update_seat(request):
    """
    Update or create availability for a particular movie slot.
    Requires movie_name, date, time_slot, and availability data.
    """
    try:
        movie_name = request.data.get('movie_name')
        date = request.data.get('date')
        time_slot = request.data.get('time_slot')
        seat_status= request.data.get('seat_status')

        # Check if the record exists
        slot, created = MovieAvailability.objects.update_or_create(
            movie_name=movie_name,
            date=date,
            time_slot=time_slot,
            defaults={'seat_status': seat_status}
        )

        if created:
            return Response({'msg': 'Booking created successfully.'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'msg': 'Booking updated successfully.'}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'msg': str(e)}, status=status.HTTP_400_BAD_REQUEST)

from django.http import JsonResponse
from django.middleware.csrf import get_token

def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})
