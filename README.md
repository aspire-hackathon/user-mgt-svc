# Digital Disaster Relief

1. docker build . -t anokhadocker/aspire-user-mgt:1

2. docker run --name aspire-user-mgt -d -p 8080:8080 anokhadocker/aspire-user-mgt:1

3. docker push anokhadocker/aspire-user-mgt:1  

4. kubectl apply -f user-mgt.yaml

5. kubectl delete -f user-mgt.yaml

6. minikube service user-service

