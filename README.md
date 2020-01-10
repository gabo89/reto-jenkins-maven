# reto-ibm


------------------------------------

```
sudo yum check-update
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker
sudo systemctl start docker
sudo systemctl enable docker
```
------------------------------------

docker must be running in jenkins master
in test environment run docker as root 
add jenkins into docker socket

```
sudo usermod -a -G root jenkins 

```
install jenkins via rpm and install

``` 
pipeline plugin
gitlab plugin
docker plugin
git plugin 
```
restart jenkins , set pipeline task and set git url to https://gitlab.com/gabo89/reto-ibm

this are script to test and semi automatize task for troubleshooting
------------------------------------

```
1:create.sh 
2:publish.sh 
3:deploy.sh
```
------------------------------------


aditional info
------------------------------------

```
*pick a agent or master in linux  that have docker installed and also check that some build may fail due to workspace get inconsistent across different agent so its better to build into single node jenkins master for testing purpose (aplication debug vs infraestructure debug)
*check space in jenkins agent or master, disk memory and cpu usage , on high usage environment some build may not complete due to not enought resources
*run strictly on linux jenkins node  since i have not jenkins agent or master running on windows  and cannot ensure aplication is runable in windows
*remenber to clean the latest tag,sometimes it doesnt get updated in docker hub 
*remenber to clean local images cloned from remote registry ,sometimes does not get updated
```
------------------------------------

umongo-client
------------------------------------
execute sh script ,can be used to check mongodb status and make queries, set connection string 
```
mongodb://192.168.50.5:27017/sumas
```
------------------------------------

