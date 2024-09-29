from django.db import models

# Create your models here.
class MovieAvailability(models.Model):
    movie_name = models.CharField(max_length=255)
    date = models.CharField(max_length=30)  
    time_slot = models.CharField(max_length=20)  
    seat_status = models.CharField(max_length=30) 

