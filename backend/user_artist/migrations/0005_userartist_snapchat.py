# Generated by Django 4.2.1 on 2023-10-08 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_artist', '0004_alter_userartist_biography'),
    ]

    operations = [
        migrations.AddField(
            model_name='userartist',
            name='snapchat',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]