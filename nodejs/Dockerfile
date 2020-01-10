from docker.io/node:latest
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
RUN npm fund
COPY server.js /usr/src/app/server.js
EXPOSE 4000
CMD [ "nodemon", "/usr/src/app/server.js" ]


