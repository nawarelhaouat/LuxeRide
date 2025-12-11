# Étape 1 : Build Angular
FROM node:18 AS build
RUN apt-get update && apt-get upgrade -y && apt-get clean && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Étape 2 : Serve avec Nginx
FROM nginx:alpine
RUN apk update && apk upgrade
COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]