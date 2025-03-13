pipeline {
    agent any

    stages {

        stage('Install Dependencies - Server') {
            steps {
                dir('server') {
                    bat 'npm install'
                }
            }
        }

        stage('Install Dependencies - Client') {
            steps {
                dir('client') {
                    bat 'npm install'
                }
            }
        }

        stage('Build - Client') {
            steps {
                dir('client') {
                    bat 'npm run build'
                }
            }
        }

        stage('Test - Server') {
            steps {
                dir('server') {
                    bat 'npm test'
                }
            }
        }

        stage('Test - Client') {
            steps {
                dir('client') {
                    
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            cleanWs()
        }
        success {
            echo 'Build and tests succeeded!'
        }
        failure {
            echo 'Build or tests failed.'
        }
    }
}