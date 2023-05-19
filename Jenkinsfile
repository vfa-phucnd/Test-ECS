def sourceRepo = 'git@github.com:vfa-phucnd/Test-ECS.git'
def sourceBranch = 'main'

def githubAccount = 'github-ssh-source'
def dockerhubAccount = 'dockerhub'
def databaseAccount = 'database'
def gitopsAccount = 'gitops-repo'

buildFolder = './'
def version = "v0.${BUILD_NUMBER}"

def gitopsRepo = 'https://github.com/vfa-phucnd/test-gitops.git'
def gitopsBranch = 'master'

def helmRepo = "test-gitops"
def helmValueFile = "test-gitops-app/test-gitops-values.yaml" 

pipeline {
    agent any
	
    environment {
        DOCKER_REGISTRY = 'https://registry.fke.fptcloud.com'
        DOCKER_IMAGE_NAME = "9eb0f205-5206-4f41-8547-91b835251d52/test-gitops"
        DOCKER_IMAGE = "registry.fke.fptcloud.com/${DOCKER_IMAGE_NAME}"
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
                withCredentials([usernamePassword(credentialsId: databaseAccount, passwordVariable: 'DB_PASSWORD', usernameVariable: 'DB_USERNAME')]) {
                    sh 'echo "\nDB_USERNAME=${DB_USERNAME}" >> .env'
                    sh 'echo "\nDB_PASSWORD=${DB_PASSWORD}" >> .env'
                }

                script {
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
                withCredentials([usernamePassword(credentialsId: gitopsAccount, passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                    sh """#!/bin/bash
                        [[ -d ${helmRepo} ]] && rm -r ${helmRepo}
                        git config --global user.email "phucnd@vitalify.asia"
                        git config --global user.name "${GIT_USERNAME}"
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
