FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g expo-cli
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 19000 19001 19002
CMD ["npx", "expo", "start", "--tunnel"]
