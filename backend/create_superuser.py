from django.contrib.auth import get_user_model
from django.db import IntegrityError

User = get_user_model()

try:
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'adminpassword123')
        print('Superuser created successfully')
    else:
        print('Superuser already exists')
except IntegrityError as e:
    print(f'Error creating superuser: {e}')