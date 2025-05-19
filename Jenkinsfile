pipeline {
    agent any

    environment {
        IMAGE_NAME = 'react-frontend'
        CONTAINER_NAME = 'react_frontend'
    }

    stages {
        stage('Check Node.js') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
              
                    bat 'npm cache clean --force'
                    bat 'npm install react-scripts --save' // Installation explicite
                    bat 'npm install'
                
            }
        }

        stage('Build React app') {
            steps {
                
                    bat 'CI='' npm run build
'
                
            }
        }

        stage('Build Docker image') {
            steps {
               
                    bat "docker build -t ${IMAGE_NAME} ."
                
            }
        }

        stage('Run Docker container') {
            steps {
                bat "docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${IMAGE_NAME}"
            }
        }
    }

    post {
        success {
            echo '✅ Déploiement réussi !'
        }
        failure {
            echo '❌ Échec du pipeline.'
        }
    }
}