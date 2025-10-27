pipeline {
  agent any

  environment {
    IMAGE_NAME = 'naufal354/ccjenkinsweb'
    REGISTRY_CREDENTIALS = 'dockerhub-credentials'
  }

  stages {

    stage('Checkout Source Code') {
      steps {
        echo 'Mengambil source code dari repository'
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        echo 'Menginstal dependensi project Expo'
        bat 'npm install'
      }
    }

    stage('Lint & Test (Optional)') {
      steps {
        echo 'Menjalankan lint/test untuk memastikan project berjalan baik'
        bat 'echo "Belum ada test untuk dijalankan"'
      }
    }

    stage('Build Docker Image') {
      steps {
        echo 'Membangun image Docker untuk aplikasi Expo'
        bat """docker build -t ${env.IMAGE_NAME}:${env.BUILD_NUMBER} ."""
      }
    }

    stage('Push Docker Image') {
      steps {
        echo 'Mengirim image Docker ke Docker Hub'
        withCredentials([usernamePassword(credentialsId: env.REGISTRY_CREDENTIALS, usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          bat """docker login -u %USER% -p %PASS%"""
          bat """docker push ${env.IMAGE_NAME}:${env.BUILD_NUMBER}"""
          bat """docker tag ${env.IMAGE_NAME}:${env.BUILD_NUMBER} ${env.IMAGE_NAME}:latest"""
          bat """docker push ${env.IMAGE_NAME}:latest"""
        }
      }
    }

    stage('Deploy Container (Run Expo)') {
      steps {
        echo 'Menjalankan container Expo di Docker'
        bat """
        docker stop expo-mobile || echo "Container belum ada, lanjut..."
        docker rm expo-mobile || echo "Container belum ada, lanjut..."
        docker run -d --name expo-mobile -p 19000:19000 -p 19001:19001 -p 19002:19002 ${env.IMAGE_NAME}:latest
        """
      }
    }

    stage('Pipeline Finished') {
      steps {
        echo 'Pipeline selesai! Expo App kamu sudah jalan di Docker.'
      }
    }
  }

  post {
    failure {
      echo 'Build gagal. Cek kembali konfigurasi Docker atau koneksi jaringan.'
    }
    success {
      echo 'Semua tahap berhasil dijalankan tanpa error.'
    }
  }
}
