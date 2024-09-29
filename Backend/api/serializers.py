from rest_framework import serializers
from .models import  UserData
from django.contrib.auth.hashers import make_password


# User Serializer (using ModelSerializer)
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=30, write_only=True)  # Use write_only for password

    class Meta:
        model = UserData
        fields = ['name', 'email', 'password']

    def create(self, validated_data):
        # Hash the password before saving it
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
