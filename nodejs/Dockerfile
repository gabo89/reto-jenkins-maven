from docker.io/node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm fund
COPY server.js ./
EXPOSE 4000
HEALTHCHECK CMD curl --fail http://localhost:4000/ || exit 1
CMD [ "nodemon", "server.js" ]

