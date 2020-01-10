pipeline {
   agent any

 options {
      timeout(time: 30, unit: 'MINUTES') 
  }

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


	stage('docker hub repositories'){
	steps{
		echo "https://hub.docker.com/repository/docker/dockeragent89/nginx-ibm"
		echo "https://hub.docker.com/repository/docker/dockeragent89/node-ibm"
		echo "https://hub.docker.com/repository/docker/dockeragent89/mongodb-ibm"
	}			
	}

	stage('test backend as node app before containerize'){
	steps{
		dir("${env.WORKSPACE}/nodejs")
		{
		sh "npm install"
		sh "npm test"
		}
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

stage('stop running images if available') {
            steps {
sh "docker stop runing-nginx && echo 'container removed' || echo 'container  does not exist'"
sh "docker stop runing-node && echo 'container removed' || echo 'container  does not exist'"
sh "docker stop runing-mongo && echo 'container removed' || echo 'container  does not exist'"
            }
        }   

	stage('remove unused images') {
            steps {

		/* dont allow local old docker.io images break the new images*/
		sh "docker rmi -f docker.io/dockeragent89/node-ibm && echo 'recent erased ' || echo 'erased'"
		sh "docker rmi -f docker.io/dockeragent89/nginx-ibm && echo 'recent erased ' || echo 'erased'"
		sh "docker rmi -f docker.io/dockeragent89/mongodb-ibm && echo 'recent erased ' || echo 'erased'"
		sh "docker rmi -f ${env.registry1}:latest && echo 'recent erased ' || echo 'erased'"
		sh "docker rmi -f ${env.registry2}:latest && echo 'recent erased ' || echo 'erased'"
		sh "docker rmi -f ${env.registry3}:latest && echo 'recent erased ' || echo 'erased'"
            }
        }  


	stage('create private network in local docker') {
            steps {
sh "docker network create --subnet=192.168.50.0/24 private_net && echo 'network created' || echo 'network already exists'"

            }
        }  


stage('start database containers ') {
            steps {

sh "docker run --name runing-mongo -u root --net private_net --ip 192.168.50.5 --rm -d dockeragent89/mongodb-ibm:latest"
	}

}

stage('wait to mongodb ') {
            steps {
		echo "waiting"
		sh "sleep 7"
		}
}

stage('start frontend-backend containers ') {
            steps {
sh "docker run --name runing-node -u root --net private_net --ip 192.168.50.4 --rm -d  dockeragent89/node-ibm:latest"

sh "docker run --name runing-nginx -u root --net private_net --ip 192.168.50.3 --rm -d dockeragent89/nginx-ibm:latest"


            }
        }  

    }

  post {
        always {
            deleteDir() /* clean up our workspace */	  
            sh "docker container ls"
	    sh "curl http://192.168.50.3:85/retoibm/sumar/100/200"
	    sh "curl http://192.168.50.3:85/retoibm/sumar/50/25"
	    sh "curl http://192.168.50.3:85/retoibm/sumar/67/33"
	    sh "curl http://192.168.50.3:85/retoibm/getall"

        }
        success {
            echo "succeeeded!"
        }
        unstable {
            echo "unstable"
        }
        failure {
            echo "failed"
        }

    }


}

