/*
* build in the main node and hand it over to slave
*/
node(){
    stage('Cloning Git') {
        checkout scm
        echo "Checkout was done!"
    }
    //check Jenkins Global Config.;     
    stage('Install dependencies') {
        nodejs('nodejs') {
            echo "Installing node_modules"
            sh 'npm install'
            echo "Modules installed"
        }
        
    }
    //compile the project
    stage('Build') {
        nodejs('nodejs') {
            sh 'npm run build'
            echo "Build completed"
        }
        
    }
    //archive whatever in dist/promise to a tar file
    stage('Package Build') {
        sh "tar -zcvf bundle.tar.gz dist/promise/"
    }
    //create the artifacts
    stage('Artifacts Creation') {
        fingerprint 'bundle.tar.gz'
        archiveArtifacts 'bundle.tar.gz'
        echo "Artifacts created"
    }
    //stash the tar file and hand over it to slave node
    stage('Stash changes') {
        stash allowEmpty: true, includes: 'bundle.tar.gz', name: 'buildArtifacts'
    }
}
//copy the tar to root document directory
node('awsnode') {
    echo 'Unstash'
    unstash 'buildArtifacts'
    echo 'Artifacts copied'

    echo 'Copy'
    sh "yes | sudo cp -R bundle.tar.gz /var/www/html && cd /var/www/html && sudo tar -xvf bundle.tar.gz"
    echo 'Copy completed'
}
