def sourceRepo = 'git@github.com:vfa-phucnd/Test-ECS.git'
def sourceBranch = 'main'

def githubAccount = 'cd27fbe4-022d-4f50-8797-a4cca412ca87'
def dockerhubAccount = 'dockerhub'

buildFolder = './'
def version = "v0.${BUILD_NUMBER}"

def gitopsRepo = 'https://github.com/vfa-phucnd/test-gitops.git'
def gitopsBranch = 'master'

def helmRepo = "test-gitops"
def helmValueFile = "test-gitops-app/test-gitops-values.yaml"

pipeline {
    agent any
	
    environment {
        DOCKER_REGISTRY = 'https://registry-1.docker.io'
        DOCKER_IMAGE_NAME = "ndp1632000/test-gitops"
        DOCKER_IMAGE = "registry-1.docker.io/${DOCKER_IMAGE_NAME}"
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

        stage('Deploy to gitops repo') {
		steps {
			withCredentials([usernamePassword(credentialsId: 'gitops-repo', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
				sh """#!/bin/bash
					[[ -d ${helmRepo} ]] && rm -r ${helmRepo}
					git clone https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${GIT_USERNAME}/test-gitops.git --branch ${gitopsBranch}
					cd ${helmRepo}
					sed -i 's|  tag: .*|  tag: "${version}"|' ${helmValueFile}
					git add .
					git commit -m "Update to version ${version}"
					git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${GIT_USERNAME}/test-gitops.git
					cd ..
					[[ -d ${helmRepo} ]] && rm -r ${helmRepo}
				"""
			}				
            	}
        }
    }
}
