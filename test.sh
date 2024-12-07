HOST=http://34.50.84.107
HOST=http://localhost:8080
curl $HOST/materials/getchapters | jq 2>/dev/null
curl $HOST/materials/getmaterials/100 | jq 2>/dev/null

curl $HOST/quiz/getchapters | jq 2>/dev/null #literally sama dengan materials
curl $HOST/quiz/getquizz/100 | jq 2>/dev/null
