pipeline {
   agent any

 environment {
    registry1 = "dockeragent89/mongodb-ibm"
    registry2 = "dockeragent89/node-ibm"
    registry3 = "dockeragent89/nginx-ibm"
    registryCredential = 'dockerhub'
    mongodb = ''
    nodejs=''
    nginx=''
  }


    stages {

	stage('docker hub credentials'){
	 steps{
		echo "dockeragent89:pelado89fiera"
	}			
	}

        stage('Build images') {
            steps {
		script {
	mongodb = docker.build("${env.registry1}:latest","-f ${env.WORKSPACE}/mongodb/Dockerfile ${env.WORKSPACE}/mongodb/")
       	nodejs = docker.build("${env.registry2}:latest","-f ${env.WORKSPACE}/nodejs/Dockerfile ${env.WORKSPACE}/nodejs/") 
       	nginx =  docker.build("${env.registry3}:latest","-f ${env.WORKSPACE}/nginx/Dockerfile ${env.WORKSPACE}/nginx/") 
                    }
            }
        }     
	 stage('publish images') {
            steps {
		script {
    			docker.withRegistry( '', registryCredential ) {
           		 	mongodb.push()
				nodejs.push()
				nginx.push()
          		}
                    }
            }
        }  

	stage('remove unused images') {
            steps {
		sh "docker rmi ${env.registry1}:latest"
		sh "docker rmi ${env.registry2}:latest"
		sh "docker rmi ${env.registry3}:latest"
            }
        }  


	stage('create private network in local docker') {
            steps {
sh "docker network create --subnet=192.168.50.0/24 private_net && echo 'network created '" || echo 'network already exists'"

            }
        }  

	stage('stop running images if available') {
            steps {
sh "docker stop runing-mongo && echo 'container removed' || echo 'container  does not exist'"
sh "docker stop runing-node && echo 'container removed' || echo 'container  does not exist'"
sh "docker stop runing-nginx && echo 'container removed' || echo 'container  does not exist'"
            }
        }  


    }
}

