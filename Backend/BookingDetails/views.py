from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import BookingData
from .serializers import BookingDataSerializer

@api_view(['POST'])
def insert_booking_data(request):
    # Insert new booking data
    serializer = BookingDataSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def search_booking_data(request):
    email = request.data.get('email', None)
    if email:
        bookings = BookingData.objects.filter(email=email)
        if bookings.exists():
            serializer = BookingDataSerializer(bookings, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'data': 'no data found'}, status=status.HTTP_404_NOT_FOUND)
    return Response({'data': 'email parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

from django.middleware.csrf import get_token
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def get_csrf_token(request):
    return Response({'csrfToken': get_token(request)})
