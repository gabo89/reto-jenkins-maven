from docker.io/node:latest
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
RUN npm fund
COPY server.js /usr/src/app/server.js
COPY check.js /usr/src/app/check.js
EXPOSE 4000
CMD [ "node", "/usr/src/app/server.js" ]
HEALTHCHECK --interval=12s --timeout=12s CMD node /usr/src/app/check.js

