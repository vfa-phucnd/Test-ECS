def sourceRepo = 'git@github.com:vfa-phucnd/Test-ECS.git'
def sourceBranch = 'main'

def githubAccount = 'cd27fbe4-022d-4f50-8797-a4cca412ca87'
def dockerhubAccount = 'dockerhub'

buildFolder = './'
def version = "v0.${BUILD_NUMBER}"

pipeline {
    agent any
	
    environment {
        DOCKER_REGISTRY = 'https://hub.docker.com'
        DOCKER_IMAGE_NAME = "ndp1632000/test-gitops"
        DOCKER_IMAGE = "hub.docker.com/${DOCKER_IMAGE_NAME}"
    }

    stages {
        stage('Init source connection') {
            steps {
                echo "checkout project"
		git branch: sourceBranch,
                    credentialsId: githubAccount,
                    url: sourceRepo				
            }
        }
        
        stage('Build') {
            steps {
                script {
                    sh "git reset --hard"
                    sh "git clean -f"                    
		    app = docker.build(DOCKER_IMAGE_NAME, buildFolder)
                    docker.withRegistry(DOCKER_REGISTRY, dockerhubAccount) {
                       app.push(version)
                    }

                    sh "docker rmi ${DOCKER_IMAGE_NAME} -f"
                    sh "docker rmi ${DOCKER_IMAGE}:${version} -f"
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Testing ne'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying ne'
            }
        }
    }
}
