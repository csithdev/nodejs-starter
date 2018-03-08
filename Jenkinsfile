pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
    }
    
  }
  stages {
    stage('test') {
      steps {
        echo 'test naja'
      }
    }
    stage('end') {
      steps {
        echo 'End'
      }
    }
  }
}