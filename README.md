# LuxeRide – DevOps Documentation

## Branch: devops
**Purpose:** Contains the complete DevOps setup for LuxeRide including CI/CD pipeline, Dockerization, and AWS deployment.
**Intended Audience:** Developers and DevOps engineers responsible for infrastructure management, deployment automation, and system maintenance.

---

## Table of Contents

1. [Overview](#overview)
2. [Docker Setup](#docker-setup)
3. [GitHub Actions CI/CD](#github-actions-cicd)
4. [EC2 Deployment](#ec2-deployment)
5. [Environment Variables](#environment-variables)
6. [Notes](#notes)

---

## Overview

This branch handles the following DevOps operations:

- **Containerization:** Frontend (Angular), Backend (Laravel), and MySQL database
- **Continuous Integration:** Backend testing, frontend building, and code linting
- **Continuous Deployment:** Docker image building → Docker Hub push → EC2 deployment via SSH and Docker Compose

---

## Docker Setup

### Development Docker Compose Configuration (docker-compose.yml)

```yaml
version: '3.9'
services:
  frontend:
    build: ./frontend
    ports:
      - "4200:80"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8000:80"
    env_file:
      - ./backend/.env
    depends_on:
      - mysql

  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: laravel_db
      MYSQL_USER: laravel_user
      MYSQL_PASSWORD: laravel_pass
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

**Architecture Details:**
- Frontend: Angular application served via Nginx
- Backend: Laravel application served via PHP CLI
- Database: MySQL with persistent volume for data storage

---

## GitHub Actions CI/CD

**Pipeline File:** `.github/workflows/deploy.yml`

### Jobs and Workflow

1. **Backend CI (Laravel)**
   - PHP environment setup
   - MySQL service container configuration
   - Database migrations
   - Test execution

2. **Frontend CI (Angular)**
   - Node.js setup
   - Dependency installation
   - Production build
   - Code linting

3. **Docker Build & Push**
   - Build Docker images for frontend and backend
   - Push images to Docker Hub registry

4. **Deploy to EC2**
   - SSH into EC2 instance
   - Pull latest Docker images
   - Restart containers using Docker Compose
   - Execute Laravel migrations and optimization commands

### Required GitHub Secrets

Configure the following secrets in your GitHub repository settings:

- DOCKERHUB_USERNAME
- DOCKERHUB_TOKEN
- EC2_HOST
- EC2_USER
- EC2_SSH_KEY

---

## EC2 Deployment

### Instance Preparation (Ubuntu 22.04)

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin
sudo usermod -aG docker ubuntu
```

### Deployment Commands

Execute the following on the EC2 instance to deploy the latest version:

```bash
cd /home/ubuntu/project
docker compose pull
docker compose down
docker compose up -d
docker exec laravel_app php artisan migrate --force
docker exec laravel_app php artisan config:cache
docker exec laravel_app php artisan route:cache
```

**Important:** The EC2 instance only pulls pre-built images from Docker Hub. No Docker image building occurs on the production server.

---

## Environment Variables

### Backend Production Configuration (.env example)

```env
APP_ENV=production
APP_DEBUG=false

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel_db
DB_USERNAME=laravel_user
DB_PASSWORD=laravel_pass
```

---

## Notes

### Critical Guidelines

1. **Image Management:** Never build Docker images directly on the EC2 instance. Always pull from Docker Hub to ensure consistency and version control.

2. **Pipeline Order:** The deployment pipeline follows a strict sequence: CI → Docker build & push → Deploy. Do not modify this order without understanding dependencies.

3. **Laravel Optimization:** Laravel optimization commands (config:cache, route:cache) must execute on every deployment to ensure optimal performance.

4. **Code Quality:** Only merge tested and stable code to the main branch. The main branch triggers automatic deployment to production.

5. **Branch Focus:** This README and branch are dedicated to DevOps concerns. Application code and business logic documentation belong in other branches.

### Deployment Best Practices

- Monitor deployment logs for errors
- Verify all services are running after deployment
- Test critical application endpoints post-deployment
- Maintain rollback capabilities by keeping previous Docker images tagged
- Schedule deployments during low-traffic periods when possible

### Security Considerations

- Regularly rotate SSH keys and Docker Hub tokens
- Restrict EC2 security group access to necessary IP ranges only
- Use environment variables for all sensitive configuration
- Never commit .env files or credentials to version control

---

**This documentation is maintained by the LuxeRide DevOps team.**
**For infrastructure changes, submit a pull request to this branch with comprehensive testing documentation.**