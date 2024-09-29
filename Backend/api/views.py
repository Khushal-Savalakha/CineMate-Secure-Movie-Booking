from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import UserData
from .serializers import UserSerializer
from django.contrib.auth.hashers import check_password

@api_view(['POST'])
def signup(request):
    email = request.data.get('email')
    password = request.data.get('password')
    name = request.data.get('name')

    # Check if email, password, and name are provided
    if not email or not password or not name:
        return Response({'msg': 'Email, password, and name are required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Create new user
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'User created successfully!'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        # Handle any unexpected errors
        return Response({'msg': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):

    email = request.data.get('email')
    password = request.data.get('password')

    # Check if email and password are provided
    if not email or not password:
        return Response({'msg': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Try to get the user by email
        user = UserData.objects.get(email=email)

        # Verify the password
        if check_password(password, user.password):
            # Send the matched user's data in the response
            print("email:",email)
            print("password",password)
            serializer = UserSerializer(user)
            return Response({'msg': 'Login successful', 'user': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
    except UserData.DoesNotExist:
        return Response({'msg': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
