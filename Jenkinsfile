#!groovy

import java.text.SimpleDateFormat

node(){
    // 我们会发布无数个版本，无数个镜像，为了保持不重名，我们用时间来区分，镜像的名字格式将会是 dockerName:tag, 例如 marco-test:202105011023
    def dateFormat = new SimpleDateFormat("yyyyMMddHHmm")
    def dockerTag = dateFormat.format(new Date())
    def dockerImageName='security_front_image'
    def dockerContainerName='security_front'

    stage('获取源代码') {
        try {
            echo "get source code"
            checkout scm
        }
        catch(err) {
            echo "get source code failed"
            throw err
        }
    }

    stage('项目打包') {
        try{
        // 运行容器实例的时候，我们已经把宿主机的docker命令映射到了容器里，所以能够直接调用docker
        // 利用镜像构建node环境并打包，运行完则退出
            docker.image('node:14.19.3-slim').inside {
                sh 'node --version'
                sh 'npm --version'
                sh "npm --registry https://registry.npm.taobao.org install"
                sh 'npm install'
                sh 'npm run build:prod'
            }
            }
        catch(err){
                echo "npm run build failed"
                throw err
            }
    }

    stage('deploy with nginx') {
        try {
            sh 'pwd'
            sh 'ls'
             // 项目打包到了dist文件夹，需要复制到devops_build文件夹下，devops_build需要手动创建，作用在后面
            sh 'cp -r dist ./devops_build'
            sh 'cp -r Dockerfile ./devops_build'
            sh 'cp -r default.conf ./devops_build'

            sh "docker rm -f ${dockerContainerName}"
//             // 创建nginx镜像，工作目录为devops_build，配置文件为Dockerfile
            sh "docker build --no-cache=true -t ${dockerImageName} ./devops_build"
//
//             // 运行nginx实例并映射80端口到宿主机
           sh "docker run --restart=always -d -p 8885:80 --name=${dockerContainerName} ${dockerImageName}"

//
//             // 只保留最新的三个镜像
//             sh """docker rmi -f \$(docker images | grep ${dockerName} | sed -n  '4,\$p' | awk '{print \$3}') || true"""
        }
        catch(err){
                echo "deploy with Nginx failed"
                throw err
            }
    }
}
