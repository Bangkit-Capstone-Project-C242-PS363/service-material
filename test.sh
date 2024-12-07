HOST=http://34.50.84.107
HOST=http://localhost:8080
token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYzQ2OTYwOS05YmY5LTQ4MWMtYTZkMC1kZDUyM2M5MDRkMDEiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpc1N1YnNjcmliZSI6ZmFsc2UsImlhdCI6MTczMzU4OTIzOX0.tL5a-r_EAAVrIBUR_YchkybUUiJ9xeifNGG0YwgHPAc
echo $token

curl $HOST/materials/getchapters -H "Authorization: Bearer $token " 2>/dev/null | jq
# curl $HOST/materials/getchapters 2>/dev/null | jq

# curl $HOST/materials/getmaterials/100 -H "Authorization: Bearer $token " 2>/dev/null | jq
#
# curl $HOST/quiz/getchapters -H "Authorization: Bearer $token " 2>/dev/null | jq
# curl $HOST/quiz/getchapters -H 2>/dev/null | jq
# curl $HOST/quiz/getquizz/100 -H "Authorization: Bearer $token " 2>/dev/null | jq
