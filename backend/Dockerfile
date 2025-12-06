FROM php:8.2-apache

# Installer extensions PHP
RUN apt-get update && apt-get install -y \
    zip unzip libpq-dev libpng-dev libonig-dev libxml2-dev \
    netcat-openbsd \
    && docker-php-ext-install pdo pdo_mysql mysqli

# Activer Apache mod_rewrite
RUN a2enmod rewrite

WORKDIR /var/www/html

# Copier le code
COPY . .

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install

# Copier .env si absent
RUN if [ ! -f .env ]; then cp .env.example .env; fi

# Permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Apache doit pointer vers /var/www/html/public
RUN sed -i 's#/var/www/html#/var/www/html/public#g' /etc/apache2/sites-available/000-default.conf

# Ajouter script d'entrée
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 80
CMD ["docker-entrypoint.sh"]
