#!/bin/bash

docker network create --subnet=192.168.50.0/24 private_net

docker stop runing-nginx
docker stop runing-node
docker stop runing-mongo

docker rmi -f docker.io/dockeragent89/node-ibm
docker rmi -f docker.io/dockeragent89/nginx-ibm
docker rmi -f docker.io/dockeragent89/mongodb-ibm
docker rmi -f dockeragent89/node-ibm
docker rmi -f dockeragent89/nginx-ibm
docker rmi -f dockeragent89/mongodb-ibm

docker run --name runing-nginx -u root --net private_net --ip 192.168.50.3 --rm -d   dockeragent89/nginx-ibm 

docker run --name runing-node  -u root --net private_net --ip 192.168.50.4 --rm -d   dockeragent89/node-ibm

docker run --name runing-mongo -u root --net private_net --ip 192.168.50.5 --rm -d   dockeragent89/mongodb-ibm


