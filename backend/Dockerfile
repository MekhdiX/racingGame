FROM node:15

WORKDIR /var/www

COPY ./ /var/www/

RUN npm install
RUN npm run build

EXPOSE 5000
CMD node dist/index.js
