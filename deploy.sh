podman build -t signmaster-material-quiz .
podman tag signmaster-material-quiz asia-southeast2-docker.pkg.dev/capstone-project-c242-ps363/backend/signmaster-material-quiz
podman push asia-southeast2-docker.pkg.dev/capstone-project-c242-ps363/backend/signmaster-material-quiz
gcloud run deploy signmaster-material-quiz --image=asia-southeast2-docker.pkg.dev/capstone-project-c242-ps363/backend/signmaster-material-quiz --platform=managed --region=asia-southeast2 --allow-unauthenticated

gcloud run services describe signmaster-material-quiz --platform=managed --region=asia-southeast2 --format='value(status.url)'
