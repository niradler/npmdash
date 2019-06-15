$(aws ecr get-login --no-include-email --region us-east-1)
docker build -t npmdash .
docker tag npmdash:latest 330386215970.dkr.ecr.us-east-1.amazonaws.com/npmdash:latest
docker push 330386215970.dkr.ecr.us-east-1.amazonaws.com/npmdash:latest