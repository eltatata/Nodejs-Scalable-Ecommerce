FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci

COPY . .

RUN npm run build

CMD ["node", "dist/app.js"]