pipeline {
   agent any

    stages {
        stage('Build images') {
            steps {
                echo 'Building..'
		script {
                def mongodb = docker.build("dockeragent89/mongodb-ibm:${env.BUILD_ID}","-f ${env.WORKSPACE}/mongodb/Dockerfile .")
                def nodejs = docker.build("dockeragent89/node-ibm:${env.BUILD_ID}","-f ${env.WORKSPACE}/nodejs/Dockerfile .") 
                def nginx = docker.build("dockeragent89/nginx-ibm:${env.BUILD_ID}","-f ${env.WORKSPACE}/nginx/Dockerfile .") 
                    }
            }
        }     
	
    }
}

