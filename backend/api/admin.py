# backend/api/admin.py
from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import Session, Booking, User, VenueOwner
from django import forms

class UserAdminForm(forms.ModelForm):
    SPORT_CHOICES = [
        ('Football', 'Football'),
        ('Basketball', 'Basketball'),
        ('Tennis', 'Tennis'),
        ('Cricket', 'Cricket'),
        ('Rugby', 'Rugby'),
    ]
    
    favourite_sports = forms.MultipleChoiceField(
        choices=SPORT_CHOICES,
        widget=forms.CheckboxSelectMultiple,
        required=False
    )

    class Meta:
        model = User
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance.pk and self.instance.favourite_sports:
            self.initial['favourite_sports'] = self.instance.favourite_sports

    def save(self, commit=True):
        user = super().save(commit=False)
        user.favourite_sports = self.cleaned_data['favourite_sports']
        if commit:
            user.save()
        return user

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    form = UserAdminForm
    list_display = ('username', 'email', 'location', 'get_sports_display')
    search_fields = ('username', 'email')
    list_filter = ('location',)

    def get_sports_display(self, obj):
        return ", ".join(obj.favourite_sports) if obj.favourite_sports else ""
    get_sports_display.short_description = 'Favourite Sports'

@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    list_display = ('sport', 'date_time', 'location', 'price', 'slots_remaining')
    search_fields = ('sport', 'location')
    list_filter = ('sport', 'location')

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'session', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('user__username', 'session__sport')

@admin.register(VenueOwner)
class VenueOwnerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('first_name', 'last_name', 'email', 'venue_details')
    ordering = ('-created_at',)