# Gunakan base image Node.js
FROM node:20-alpine

# Set direktori kerja di container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Instal dependencies
RUN npm install

# Salin seluruh kode aplikasi ke container
COPY . .

# Expose port sesuai konfigurasi
EXPOSE 5000

# Jalankan aplikasi
CMD ["node", "index.js"]
