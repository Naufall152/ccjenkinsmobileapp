FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install -g expo-cli
RUN npm install

COPY . .

EXPOSE 19000 19001 19002

CMD ["npx", "expo", "start", "--tunnel"]
