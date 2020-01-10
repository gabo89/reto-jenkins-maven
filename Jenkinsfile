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
	mongodb = docker.build("${env.registry1}:${env.BUILD_ID}","-f ${env.WORKSPACE}/mongodb/Dockerfile .")
       	nodejs = docker.build("${env.registry2}:${env.BUILD_ID}","-f ${env.WORKSPACE}/nodejs/Dockerfile .") 
       	nginx =  docker.build("${env.registry3}${env.BUILD_ID}","-f ${env.WORKSPACE}/nginx/Dockerfile .") 
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

