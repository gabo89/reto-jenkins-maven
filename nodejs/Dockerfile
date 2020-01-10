from docker.io/node:latest
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
RUN npm fund
COPY . /usr/src/app/
EXPOSE 4000
CMD [ "nodemon", "/usr/src/app/server.js" ]


