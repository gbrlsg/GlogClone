# Generated by Django 5.1.1 on 2024-09-11 18:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("monreqs", "0002_monitoringrequest_logins_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="monitoringrequest",
            old_name="vehicle",
            new_name="vehicle_type",
        ),
        migrations.AddField(
            model_name="monitoringrequest",
            name="destination",
            field=models.CharField(default="", max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="monitoringrequest",
            name="origin",
            field=models.CharField(default="none", max_length=255),
            preserve_default=False,
        ),
    ]
