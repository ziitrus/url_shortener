FROM node:20-slim
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl
COPY package*.json ./
RUN npm ci --quiet
COPY prisma ./prisma
COPY ./src src

RUN npm i prisma -y
RUN npx prisma generate