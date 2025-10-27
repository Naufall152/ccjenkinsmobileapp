# Gunakan image Node dengan versi stabil
FROM node:18

# Install dependencies yang diperlukan untuk Expo dan Android build
RUN apt-get update && apt-get install -y openjdk-17-jdk gradle && apt-get clean

# Set work directory
WORKDIR /usr/src/app

# Copy package.json dan install dependency
COPY package*.json ./
RUN npm install --global expo-cli eas-cli
RUN npm install

# Copy semua file proyek
COPY . .

# Jalankan Metro bundler secara default
CMD ["npm", "start"]
