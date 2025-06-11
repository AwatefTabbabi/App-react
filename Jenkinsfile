pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo '📦 Clonage du dépôt...'
                checkout scm
            }
        }

        stage('Build Docker containers') {
            steps {
                echo '🐳 Construction des conteneurs Docker...'
                bat 'docker-compose build'
            }
        }

        stage('Run containers') {
            steps {
                echo '🚀 Lancement des conteneurs Docker...'
                bat 'docker-compose down || exit 0' // Correction pour Windows
                bat 'docker-compose up -d'
            }
        }

        stage('Wait for DB & Run migrations') {
            steps {
                script {
                    waitUntil {
                        try {
                            bat 'docker exec django_web python manage.py check --database default'
                            return true
                        } catch (Exception e) {
                            sleep(5)
                            return false
                        }
                    }
                    bat """
                        docker exec django_web python manage.py makemigrations
                        docker exec django_web python manage.py migrate
                    """
                }
            }
        }
    }

   post {
    success {
        echo '✅ Backend Django déployé avec succès !'
    }
    failure {
        echo '❌ Échec du pipeline Django.'
        bat "docker-compose -f ${COMPOSE_FILE} logs"
    }
}
}