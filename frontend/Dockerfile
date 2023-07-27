FROM node:15

WORKDIR /var/www

COPY ./ /var/www/

RUN npm install
RUN npm run build

EXPOSE 3000
CMD node dist/server.js
