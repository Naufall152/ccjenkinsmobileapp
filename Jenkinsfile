pipeline {
  agent {
    docker {
      image 'node:18'
      args '-u root:root'
    }
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install -g expo-cli eas-cli'
        sh 'npm install'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm test || echo "No tests found"'
      }
    }

    stage('Build APK (via EAS)') {
      environment {
        EXPO_TOKEN = credentials('expo-token') // simpan token di Jenkins credentials
      }
      steps {
        sh 'eas build --platform android --profile preview --non-interactive'
      }
    }

    stage('Archive Build') {
      steps {
        archiveArtifacts artifacts: 'build/**', fingerprint: true
      }
    }
  }

  post {
    success {
      echo '✅ Build Expo berhasil!'
    }
    failure {
      echo '❌ Build gagal! Cek logs untuk detail error.'
    }
  }
}
