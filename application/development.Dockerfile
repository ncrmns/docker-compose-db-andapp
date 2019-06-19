FROM node:10
RUN npm install -g nodemon
RUN npm install -g forever
WORKDIR /application
ADD package.json .
RUN npm install
VOLUME /application/code
EXPOSE 1234
CMD forever --spinSleepTime 10000 --minUptime 5000 -c "nodemon --exitcrash -L --watch /application/code" /application/code/app.js