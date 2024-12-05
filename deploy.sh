podman build -t signmaster-material-quiz .
podman tag signmaster-material-quiz asia-southeast2-docker.pkg.dev/capstone-project-c242-ps363/backend/signmaster-material-quiz
podman push asia-southeast2-docker.pkg.dev/capstone-project-c242-ps363/backend/signmaster-material-quiz
gcloud run deploy signmaster-material-quiz --image=asia-southeast2-docker.pkg.dev/capstone-project-c242-ps363/backend/signmaster-material-quiz --platform=managed --region=asia-southeast2 --allow-unauthenticated

url=$(gcloud run services describe signmaster-material-quiz --platform=managed --region=asia-southeast2 --format='value(status.url)')
url=${url#https://}
echo "setup $url to nginx"
gcloud compute ssh nginx -- -p 22 "sudo sed 's/proxy_pass.*\/material/proxy_pass https:\/\/$url\/material/g' -i /etc/nginx/conf.d/signlang.conf; sudo nginx -t; sudo systemctl reload nginx"
gcloud compute ssh nginx -- -p 22 "sudo sed 's/proxy_pass.*\/quiz/proxy_pass https:\/\/$url\/quiz/g' -i /etc/nginx/conf.d/signlang.conf; sudo nginx -t; sudo systemctl reload nginx"
