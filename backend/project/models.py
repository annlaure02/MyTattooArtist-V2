from django.db import models
import uuid

# Create your models here.

class TattooStyle(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    style_name = models.CharField(max_length=50, blank=True)
    description = models.TextField(max_length=1000, blank=True)

    def __str__(self):
        return self.style_name

# Create table Studio
class Studio(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    studio_name = models.CharField(max_length=150, blank=True)
    studio_number_street = models.CharField(max_length=5, blank=True)
    studio_street = models.CharField(max_length=200, blank=True)
    studio_address_complement = models.CharField(max_length=200, blank=True)
    studio_post_code = models.CharField(max_length=5, blank=True)
    studio_city = models.CharField(max_length=100, blank=True)
    studio_department = models.CharField(max_length=100, blank=True)
    studio_region = models.CharField(max_length=100, blank=True)
    studio_country = models.CharField(max_length=100, blank=True)
    studio_website = models.CharField(max_length=100, blank=True)
    studio_siret = models.CharField(max_length=18, blank=True)
    opening_hours = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return self.studio_name
