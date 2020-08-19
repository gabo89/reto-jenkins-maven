from docker.io/node:latest
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
RUN npm fund
COPY server.js /usr/src/app/server.js
EXPOSE 4000
ENV servidor localhost
ENV puerto 27017
ENV username local
ENV password local
CMD servidor=$servidor puerto=$puerto username=$username password=$password node /usr/src/app/server.js


