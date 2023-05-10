def sourceRepo = 'https://github.com/vfa-phucnd/Test-ECS.git'
def sourceBranch = 'main'

def githubAccount = 'cd27fbe4-022d-4f50-8797-a4cca412ca87'
def dockerhubAccount = 'dockerhub'

folderBuildCommand = './'
def version = "v0.${BUILD_NUMBER}"

pipeline {
    agent any

    stages {
        stage('Checkout project') {
            steps {
                echo "checkout project"
				git branch: sourceBranch,
                credentialsId: githubAccount,
                url: sourceRepo
                sh "git reset --hard"				
            }
        }
        
        stage('Build') {
            steps {
                echo 'Build ne'
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
