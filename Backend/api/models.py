from django.db import models
from django.contrib.auth.hashers import make_password
# from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserData(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
