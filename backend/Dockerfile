<<<<<<< HEAD
FROM node:16

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5000

=======
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
>>>>>>> a9a4e7a917f89a05474825f073d6cf286a52f1bb
CMD ["node", "index.js"]
