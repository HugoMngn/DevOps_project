#!/bin/bash

# Attente que la base de données soit prête
echo "Attente que la base de données soit prête..."
until mysql -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -e 'SELECT 1' &>/dev/null; do
  echo "La base de données n'est pas encore prête, on attend..."
  sleep 5
done

# Exécution des migrations
echo "Base de données prête, exécution des migrations..."
dotnet ef database update --no-build --project ./Paper.Api.csproj

# Démarrer l'application .NET
echo "Démarrage de l'application .NET..."
dotnet Paper.Api.dll
