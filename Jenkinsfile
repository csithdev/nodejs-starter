pipeline {
  agent any
  tools {
    nodejs 'Node_8.9'
  }
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
        sh 'cd ku-backend && npm test'
      }
    }
    stage('Build container') {
      steps {
        sh 'docker build -t ku/node-example:latest .'
        sh "docker tag ku/node-example:latest ku/node-example:latest:v${env.BUILD_ID}"
      }
    }
    stage('Deploy') {
      steps {
        input 'Ready to deploy?'
        sh 'docker stack rm node-example'
        sh 'docker stack deploy node-example --compose-file docker-compose.yml'
        sh "docker service update node-example_server --image badamsbb/node-example:v${env.BUILD_ID}"
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
}
