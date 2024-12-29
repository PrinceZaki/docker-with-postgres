FROM node:20

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install 

COPY . .

RUN npm install  typescript



EXPOSE 3000

CMD ["npm","run", "dev:docker"]






















