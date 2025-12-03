#!/bin/sh

# Attendre que MySQL soit prêt
echo "Waiting for MySQL..."
while ! nc -z mysql 3306; do
  sleep 1
done
echo "MySQL is ready!"

# Générer clé si vide
php artisan key:generate --force

# Nettoyer cache Laravel
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Lancer les migrations et seeders
php artisan migrate --force
php artisan db:seed --force

# Démarrer Apache
apache2-foreground
