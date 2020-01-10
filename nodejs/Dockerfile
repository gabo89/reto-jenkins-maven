from docker.io/node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm fund
COPY . .
EXPOSE 4000
CMD [ "node", "server.js" ]


