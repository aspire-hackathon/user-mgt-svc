pipeline {
   agent any
   environment {
     SERVICE_NAME = "user-mgt-svc"
     REPOSITORY_TAG="${YOUR_DOCKERHUB_USERNAME}/${ORGANIZATION_NAME}-${SERVICE_NAME}:${BUILD_ID}"
   }

   stages {
      stage('Preparation') {
         steps {
            cleanWs()
            git credentialsId: 'GitHub', url: "https://github.com/${ORGANIZATION_NAME}/${SERVICE_NAME}"
         }
      }

      stage('Build and Push Image') {
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
   }
}
