pipeline {
   agent { dockerfile true }

    stages {
        stage('Build images') {
            steps {
		script {
                def mongodb = docker.build("dockeragent89/mongodb-ibm:${env.BUILD_ID}","-f ${env.WORKSPACE}/mongodb/Dockerfile .")
 
                    }
            }
        }     
	
    }
}

