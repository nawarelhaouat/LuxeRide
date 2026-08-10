# LuxeRide

LuxeRide is a full-stack car rental platform with a public-facing booking site for clients and an admin dashboard for managing fleet, reservations, and business performance — including an AI-generated business insights panel.

## Features

**Client side**
- Browse and search the vehicle catalog, filter by criteria, and view the most rented cars
- Submit a rental reservation (dates, personal details) for a chosen vehicle
- Contact form to reach the agency

**Admin side**
- Secure admin authentication (login, password recovery)
- Fleet management (create, update, delete, and list vehicles)
- Reservation management (view and validate/update bookings)
- Notifications (mark as read / mark all as read)
- Analytics dashboard with charts (Chart.js)
- **AI business insights**: computes key metrics (total reservations, revenue, occupation rate, cancellation rate, top-rented vehicle) and sends them to a local LLM (Mistral via [Ollama](https://ollama.com)) to generate a short, actionable business commentary for the agency manager, in French, tailored to the Moroccan car rental market

## Tech stack

**Backend** — Laravel 12 (PHP 8.2+), Laravel Sanctum for auth, MySQL 8
**Frontend** — Angular 19, Angular Material, Bootstrap 5, Chart.js / ng2-charts
**AI** — Ollama running the `mistral` model, called from the backend for the business insight feature
**Testing** — PHPUnit (backend), Cypress (end-to-end, both frontend and backend)
**Infrastructure** — Docker Compose (frontend, backend, MySQL), Nginx (frontend container)

## Project structure

```
.
├── backend/            # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/   # Admin auth, vehicles, reservations, notifications, dashboard, AI insights, contact
│   │   ├── Models/              # Admin, User, Voiture, Location, Notification
│   │   └── Services/            # BusinessAnalysisService, AiInsightService
│   ├── database/migrations/
│   ├── routes/api.php
│   └── Dockerfile
├── frontend/           # Angular app
│   └── src/app/
│       ├── components/  # navbar, footer, hero-section, sidebar, vehicle-filter, contact, status-badge, popular-offers
│       ├── pages/        # landing, login, dashboard, vehicles, vehicules-client, reservations, reservation-client
│       └── services/
└── docker-compose.yml
```

## Getting started

### With Docker (recommended)

```bash
git clone https://github.com/nawarelhaouat/LuxeRide.git
cd LuxeRide

# copy and configure the backend environment file
cp backend/.env.example backend/.env

docker-compose up --build
```

- Frontend: [http://localhost:4200](http://localhost:4200)
- Backend API: [http://localhost:8000](http://localhost:8000)
- MySQL: `localhost:3306` (db: `laravel_db`, user: `laravel_user`)

Then, inside the backend container, run the usual Laravel setup:

```bash
docker exec -it laravel_app php artisan key:generate
docker exec -it laravel_app php artisan migrate --seed
```

### Manual setup

**Backend**
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

**Frontend**
```bash
cd frontend
npm install
ng serve
```

### AI insights feature

The business insight endpoint calls a local Ollama instance running the `mistral` model at `http://localhost:11434`. Install [Ollama](https://ollama.com), then run:

```bash
ollama pull mistral
ollama serve
```

## Testing

```bash
# Backend
cd backend
php artisan test

# End-to-end (Cypress)
npm run cypress:open   # or cypress:run, from frontend or backend depending on config
```

## Author

Nawar El Haouat
