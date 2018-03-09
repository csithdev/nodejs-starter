pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        checkout scm
      }
    }
    stage('Verify Tools') {
      parallel {
        stage('node') {
          steps {
            sh 'npm -v'
          }
        }
        stage('docker') {
          steps {
            sh 'docker -v'
          }
        }
      }
    }
    stage('Build app') {
      steps {
        sh 'cd ku-backend && npm prune'
        sh 'cd ku-backend && npm install'
      }
    }
    stage('Test') {
      steps {
        echo 'TEST'
      }
    }
    stage('Build container') {
      steps {
        sh 'docker build -t csithdev/lab02:latest .'
        sh "docker tag csithdev/lab02:latest csithdev/lab02:v${env.BUILD_ID}"
      }
    }
    stage('Deploy') {
      steps {
        input 'Ready to deploy?'
        sh '"docker push csithdev/lab02:v(${ENV.BUILD_ID})"'
      }
    }
    stage('Verify') {
      steps {
        input 'Everything good?'
      }
    }
    stage('Clean') {
      steps {
        sh 'npm prune'
        sh 'rm -rf node_modules'
      }
    }
  }
  tools {
    nodejs 'Node_8.9'
  }
}