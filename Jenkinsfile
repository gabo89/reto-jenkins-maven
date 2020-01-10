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
	mongodb = docker.build("${env.registry1}:${env.BUILD_ID}","-f ${env.WORKSPACE}/mongodb/Dockerfile ${env.WORKSPACE}/mongodb/")
       	nodejs = docker.build("${env.registry2}:${env.BUILD_ID}","-f ${env.WORKSPACE}/nodejs/Dockerfile ${env.WORKSPACE}/nodejs/") 
       	nginx =  docker.build("${env.registry3}${env.BUILD_ID}","-f ${env.WORKSPACE}/nginx/Dockerfile ${env.WORKSPACE}/nginx/") 
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
		sh "docker rmi ${env.registry1}:${env.BUILD_ID}"
		sh "docker rmi ${env.registry2}:${env.BUILD_ID}"
		sh "docker rmi ${env.registry3}:${env.BUILD_ID}"
            }
        }  

    }
}

