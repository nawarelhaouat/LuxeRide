FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    zip unzip git libpq-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql

WORKDIR /var/www/html

COPY . .

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
