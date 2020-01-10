#!/bin/bash
docker build -f ./nginx/Dockerfile -t dockeragent89/nginx-ibm ./nginx/
docker build -f ./nodejs/Dockerfile -t dockeragent89/node-ibm ./nodejs/
docker build -f ./mongodb/Dockerfile -t dockeragent89/mongodb-ibm ./mongodb/
