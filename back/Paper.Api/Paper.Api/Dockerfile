# Étape 1 : Base runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Ajout des variables d'environnement pour MySQL
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1 \
    ConnectionStrings__DefaultConnection="Server=db;Database=paperdb;User=user;Password=password;"

# Étape 2 : Build de l'application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copier le projet et restaurer les dépendances
COPY ["Paper.Api.csproj", "./"]
RUN dotnet restore "Paper.Api.csproj"

# Copier le reste du code et compiler
COPY . .
RUN dotnet build "Paper.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Étape 3 : Publier l'application
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Paper.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Étape 4 : Préparer l'image finale avec SDK et runtime
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS final
WORKDIR /app

# Copier l’application publiée
COPY --from=publish /app/publish .

# Copier le script entrypoint
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Ajouter un healthcheck pour vérifier si l'API fonctionne
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD curl --fail http://localhost:8080/health || exit 1

# Installer l'outil dotnet-ef
RUN dotnet tool install --global dotnet-ef

# Ajouter le répertoire des outils dotnet au PATH
ENV PATH="${PATH}:/root/.dotnet/tools"

# Définir l'utilisateur
USER app

# Définir le point d'entrée pour le conteneur
ENTRYPOINT ["dotnet", "Paper.Api.dll"]
