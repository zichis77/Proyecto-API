FROM node:12

WORKDIR /app

COPY package*.json ./

COPY index.js ./

RUN npm install

COPY . .

CMD ["npm", "start"]