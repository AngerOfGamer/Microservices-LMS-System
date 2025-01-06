# Gunakan image Node.js versi terbaru
FROM node:20-alpine

# Tentukan direktori kerja di container
WORKDIR /app

# Salin file package.json dan package-lock.json untuk instalasi dependensi
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin seluruh file aplikasi ke dalam container
COPY . .

# Expose port untuk backend
EXPOSE 3000

# Jalankan aplikasi Node.js
CMD ["node", "db.js"]
