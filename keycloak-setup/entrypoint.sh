#!/bin/sh

# Attente que Keycloak démarre
sleep 6000

# Obtenir le token admin
TOKEN=$(curl -s -X POST "http://keycloak:8080/realms/master/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=admin-cli" \
  -d "username=admin" \
  -d "password=admin" \
  -d "grant_type=password" | jq -r .access_token)

# Vérifier si le token est bien récupéré
if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
  echo "Erreur : Impossible de récupérer le token d'admin Keycloak."
  exit 1
fi

echo "Token récupéré avec succès."

# Création du Realm "paper"
curl -s -X POST "http://keycloak:8080/admin/realms" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "realm": "paper",
    "enabled": true
  }'

echo "Realm 'paper' créé."

# Création du Client "paper"
curl -s -X POST "http://keycloak:8080/admin/realms/paper/clients" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "paper",
    "publicClient": true,
    "directAccessGrantsEnabled": true,
    "redirectUris": ["*"]
  }'

echo "Client 'paper' créé."

# Création de l'Utilisateur "test"
curl -s -X POST "http://keycloak:8080/admin/realms/paper/users" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test",
    "enabled": true,
    "credentials": [{
      "type": "password",
      "value": "test",
      "temporary": false
    }]
  }'

echo "Utilisateur 'test' créé."
