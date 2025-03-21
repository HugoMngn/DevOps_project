curl -X POST "http://localhost:8080/admin/realms" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $(curl -s -X POST http://localhost:8080/realms/master/protocol/openid-connect/token \
          -H "Content-Type: application/x-www-form-urlencoded" \
          -d "client_id=admin-cli" \
          -d "username=admin" \
          -d "password=admin" \
          -d "grant_type=password" | jq -r .access_token)" \
     --data @/opt/keycloak/data/import/realm-config.json
