#!/bin/bash
cd ./nginx
docker build -f Dockerfile -t dockeragent89/nginx-ibm .
cd ..
cd ./nodejs
docker build -f Dockerfile -t dockeragent89/node-ibm .

docker push dockeragent89/nginx-ibm
docker push dockeragent89/node-ibm
