# Tahap 1: Build aplikasi React
FROM node:20-alpine AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# Tahap 2: Gunakan Nginx untuk menyajikan build React
FROM nginx:alpine

# Hapus default Nginx HTML files
RUN rm -rf /usr/share/nginx/html/*

# Salin hasil build dari tahap 1 ke folder Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Salin konfigurasi Nginx untuk menggunakan port 8080
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 untuk akses HTTP
EXPOSE 3000
