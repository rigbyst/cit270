echo "logging in"

curl --insecure -v -d "@login.json" POST -H "Content-Type:application/json" http://localhost:3000/login

rem curl -v https://dev.stedi.me/validate/f803f12f-bc5f-4896-913d-1edd16d9e102

