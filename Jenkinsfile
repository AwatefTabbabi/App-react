pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '📦 Clonage du dépôt...'
                checkout scm
            }
        }

        stage('Build Docker containers') {
            steps {
                 dir('BACKEND') { 
                echo '🐳 Construction des conteneurs Docker...'
                bat "docker-compose build"
                 }
            }
        }

        stage('Run containers') {
            steps {
                 dir('BACKEND') { 
                echo '🚀 Lancement des conteneurs Docker...'
                bat "docker-compose up -d"
                 }
            }
        }

        stage('Wait for DB & Run migrations') {
            steps {
                 dir('BACKEND') { 
                echo '🛠️ Attente de la base de données & migration Django...'
                bat """
                    sleep 10
                    docker exec django_web python manage.py makemigrations
                    docker exec django_web python manage.py migrate
                """
                 }
            }
        }
    }

    post {
        success {
            echo '✅ BACKEND Django déployé avec succès !'
        }
        failure {
             dir('BACKEND') { 
            echo '❌ Échec du pipeline Django.'
            bat "docker-compose -f ${COMPOSE_FILE} logs"
             }
        }
        cleanup {
            echo '🧹 Nettoyage si nécessaire...'
            // Exemple : bat "docker system prune -f"
        }
    }
}
