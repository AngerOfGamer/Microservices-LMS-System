# Gunakan base image Node.js
FROM node:20-alpine AS build

# Set working directory di container
WORKDIR /app

# Salin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependensi aplikasi
RUN npm install

# Salin seluruh file backend (termasuk config.js) ke dalam container
COPY ./backend /app

# Expose port sesuai konfigurasi aplikasi
EXPOSE 5000

# Tentukan command untuk menjalankan aplikasi
CMD ["node", "index.js"]
