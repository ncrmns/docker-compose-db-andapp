FROM node:10
WORKDIR /application
ADD package.json .
RUN npm install
ADD . ./
EXPOSE 1234
CMD ["node","/application/app.js"]