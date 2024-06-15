docker build -t webserver_image -f ./DockerServer/dockerfile . 
docker run --name nginx_webserver -d -p 8080:80 webserver_image