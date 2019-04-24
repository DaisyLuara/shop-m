pipeline {
    agent any
    environment {
        OPENURL = "m.omo.xingstation.net"
    }
    options {
        buildDiscarder(logRotator(numToKeepStr:'5'))
    }

    stages {
        stage ('clone code') {
            steps {
           git branch: 'dev', credentialsId: 'gitlab-yangxuan', url: 'http://192.168.2.126/actiview-shop/actiview-shop-m.git'
        }
       }
        stage('Build') {
            steps {
                echo 'Building..'
                sh '''
               export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:/var/lib/jenkins/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/node/bin:$PATH"
             if [ ! -d build ]; then
                     mkdir build
                else
                     echo "dir is  exist"     
                    fi
               yarn && yarn testing  
              cd build && tar zcf shop-m.tar.gz ./*
                 '''
            }
        }
        stage('Deploy') {
            steps {
                sshPublisher(publishers: [sshPublisherDesc(configName: '星视度测试', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''cd  dev-shop-m
sudo tar xf  shop-m.tar.gz  -C /data/code/actiview-shop-m/build
sudo chown -R larryz:larryz  /data/code/actiview-shop-m/build''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: 'dev-shop-m', remoteDirectorySDF: false, removePrefix: 'build', sourceFiles: 'build/*.tar.gz')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
     stage('delete') {
          steps {
       sh '''cd /var/lib/jenkins/workspace/actiview-shop-m-pipeline_dev/build
            rm -fr *.tar.gz
           ssh -p 22 larryz@120.27.138.242 " cd /home/larryz/dev-shop-m && rm -fr *.tar.gz"'''
      }
      }
    }
 post {
        success {
            dingTalk accessToken: 'https://oapi.dingtalk.com/robot/send?access_token=c2b5aefc27d45133cd20e691365fabf2a8f6b4efe03eb92e2ccf928b85430405', imageUrl: '', jenkinsUrl: 'http://jenkins.ngrok.actiview.com/',
            message: "应用构建成功！", notifyPeople: ''
            echo "应用部署成功,  访问地址为:  ${env.OPENURL}"
    
            
        }
        failure {
            dingTalk accessToken: 'https://oapi.dingtalk.com/robot/send?access_token=c2b5aefc27d45133cd20e691365fabf2a8f6b4efe03eb92e2ccf928b85430405', jenkinsUrl: 'http://jenkins.ngrok.actiview.com/',
            message: "应用构建失败,请及时查看问题原因！", notifyPeople: ''
        }
        
    }
}