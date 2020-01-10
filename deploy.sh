#!/bin/bash

docker network create --subnet=192.168.50.0/24 private_net

docker stop runing-nginx
docker stop runing-node
docker stop runing-mongo

docker run --name runing-nginx -u root --net private_net --ip 192.168.50.3 --rm -d -p 85:85 dockeragent89/nginx-ibm 

docker run --name runing-node -u root --net private_net --ip 192.168.50.4 --rm -d -p 4000:4000  dockeragent89/node-ibm

docker run --name runing-mongo -u root --net private_net --ip 192.168.50.5 --rm -d -p 27017:27017  dockeragent89/mongodb-ibm


