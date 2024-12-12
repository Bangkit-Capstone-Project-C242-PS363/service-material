HOST=http://34.50.84.107
HOST=http://localhost:8080
HOST=https://signmaster-material-quiz-kji5w4ybbq-et.a.run.app
# token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYzQ2OTYwOS05YmY5LTQ4MWMtYTZkMC1kZDUyM2M5MDRkMDEiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpc1N1YnNjcmliZSI6ZmFsc2UsImlhdCI6MTczMzU4OTIzOX0.tL5a-r_EAAVrIBUR_YchkybUUiJ9xeifNGG0YwgHPAc
token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzOGI0ZGZlNy05N2Q2LTQzMTktYTVkNi1kMDY2YTlhM2ZkNzkiLCJlbWFpbCI6ImtvbnRvbEBnbWFpbC5jb20iLCJpc1N1YnNjcmliZSI6ZmFsc2UsImlhdCI6MTczMzk5NzQyOX0.G5z1jX_ZaQmFY2t_cqJryf-aWn0cyqUkw0HPkft4zq8
echo $token

# curl $HOST/materials/getchapters -H "Authorization: Bearer $token " 2>/dev/null | jq
curl -X POST "$HOST/materials/bookmark" \
  -H "Authorization: Bearer $token" \
  -H "Content-Type: application/json" \
  -d '{"chapter_id": 200}'
#
# curl -X DELETE "$HOST/materials/bookmark" \
#   -H "Authorization: Bearer $token" \
#   -H "Content-Type: application/json" \
#   -d '{"chapter_id": 200}'

# curl $HOST/materials/getchapters 2>/dev/null | jq
#
# curl $HOST/materials/getmaterials/100 -H "Authorization: Bearer $token " 2>/dev/null | jq
#
# curl $HOST/quiz/getchapters -H "Authorization: Bearer $token " 2>/dev/null | jq
# curl $HOST/quiz/getchapters -H 2>/dev/null | jq
# curl $HOST/quiz/getquizz/100 -H "Authorization: Bearer $token " 2>/dev/null | jq
# curl -X POST "$HOST/quiz/complete" \
#   -H "Authorization: Bearer $token" \
#   -H "Content-Type: application/json" \
#   -d '{"chapter_id": 200}'

# for chapter_id in {1..15}; do
#   curl -X POST "$HOST/quiz/complete" \
#     -H "Authorization: Bearer $token" \
#     -H "Content-Type: application/json" \
#     -d "{\"chapter_id\": ${chapter_id}00}"
#
#   sleep 0.5
# done
