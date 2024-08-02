FROM node:18-alpine

WORKDIR /home/app

COPY . .

RUN npm install

EXPOSE 8081

CMD ["npm", "run", "dev"]