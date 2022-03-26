pipeline {
   agent any

   environment {
     //  must set the following environment variable
     // DOCKERHUB_USERNAME = anokhadocker
     SERVICE_NAME = "user-mgt-svc"
     REPOSITORY_TAG="anokhadocker/${SERVICE_NAME}:${BUILD_ID}"
   }

   stages {
      stage('Building Image...') {
         steps {
           sh 'docker image build -t ${REPOSITORY_TAG} .'
         }
      }

      stage('Push image to docker registry') {
         steps {
            withDockerRegistry([ credentialsId: "dockerRegistryCred", url: '' ]) {
               sh 'docker push ${REPOSITORY_TAG}'
            }
         }
      }

      stage('Deploy to Cluster') {
          steps {
            sh 'envsubst < ${WORKSPACE}/user-mgt.yaml | kubectl apply -f -'
          }
      }
   }
}