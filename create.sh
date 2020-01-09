#!/bin/bash
cd ./nginx
docker build -f Dockerfile -t dockeragent89/nginx-ibm .
cd ..
cd ./nodejs
docker build -f Dockerfile -t dockeragent89/node-ibm .


