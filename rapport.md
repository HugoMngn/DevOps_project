
# Rapport de Projet

## Introduction

Ce projet consiste en une application de gestion de stock de papier développée avec une architecture moderne utilisant des conteneurs Docker. L'application comprend un front-end en **Angular**, un back-end en **.NET**, un système d'authentification via **Keycloak**, une data base en **MySQL**, et un serveur **NGINX** en tant que reverse proxy. L'ensemble des services est déployé et orchestré à l'aide de **Docker**, garantissant une gestion simplifiée des dépendances et une portabilité accrue.

## Architecture du Projet

L'architecture du projet se compose des éléments suivants :

- **Front-end** : Application Angular pour la gestion des produits de papier.
- **Back-end** : API RESTful développée en **.NET**.
- **Base de données** : **MySQL** pour le stockage des données de stock.
- **Authentification** : **Keycloak** pour la gestion des utilisateurs et des sessions sécurisées.
- **Reverse Proxy** : **NGINX** pour diriger le trafic entre le front-end et le back-end.

Tous ces composants sont exécutés dans des conteneurs Docker, facilitant leur gestion et leur interaction via un réseau Docker interne.

## Détails des Composants

### 1. Front-end (Angular)

- **Description** : Le front-end est développé en **Angular**, avec une architecture modulaire, chaque module étant indépendant pour garantir une maintenance facile et une extension de l'application.
- **Fonctionnalités** :
  - Interface utilisateur permettant la gestion du stock (ajout, détails, modification, suppression).
  - Communication avec le backend via des API RESTful pour effectuer des opérations CRUD.
  - Intégration avec **Keycloak** pour sécuriser les connexions et l'accès aux données.

### 2. Back-end (.NET)

- **Description** : L'API back-end est développée en **.NET** et expose des endpoints RESTful pour gérer les stocks.
- **Fonctionnalités** :
  - Opérations CRUD pour gérer les stocks de papier.
  - Communication avec **MySQL** pour récupérer et stocker les données.

### 3. Base de Données (MySQL)

- **Description** : Une base de données **MySQL** est utilisée pour stocker les informations relatives aux stocks de papier.
- **Fonctionnalités** :
  - Stockage des données relatives aux stocks.
  - Initialisation automatique de la base de données avec un fichier `init.sql` lors du démarrage du projet.
  - Prise en charge des requêtes pour récupérer et mettre à jour les données des produits.
  - Persistance des données au redemarrage l'image (excepté si supprimer).

### 4. Authentification (Keycloak)

- **Description** : **Keycloak** est utilisé pour gérer l'authentification des utilisateurs.
- **Fonctionnalités** :
  - Gestion des utilisateurs et des rôles.
  - Intégration avec l'application Angular pour sécuriser l'accès aux fonctionnalités.
  - Aucun realm n'est configuré de manière par défaut, nécessitant une configuration initiale.

### 5. Reverse Proxy (NGINX)

- **Description** : **NGINX** est configuré comme reverse proxy pour diriger le trafic entre le front-end et le back-end.
- **Fonctionnalités** :
  - Redirection des requêtes entrantes vers le front-end ou le back-end.
  - Amélioration de la sécurité et des performances de l'application.

## Docker et Orchestration

Tous les composants sont déployés dans des **conteneurs Docker**, permettant une isolation des services et une gestion simplifiée des dépendances. L'orchestration est réalisée via un fichier **docker-compose.yml**, qui définit les services, leurs dépendances, et la configuration du réseau.

### Conteneurs Docker

- **Frontend** : L'application Angular est exécutée dans un conteneur Nginx, qui sert le contenu statique généré lors de la construction.
- **Backend** : Le service **.NET** est déployé dans un conteneur avec une configuration spécifique pour la connexion à MySQL.
- **Base de données** : MySQL est déployé dans son propre conteneur avec une initialisation automatique via un script `init.sql`.
- **Keycloak** : Keycloak est configuré pour démarrer en mode développement, avec un administrateur par défaut.
- **Nginx** : Un conteneur **NGINX** gère le reverse proxy entre le front-end et le back-end.

## Fonctionnalités Clés

- **Communication entre services** : Les services (frontend, backend, Keycloak, MySQL, Nginx) communiquent entre eux de manière fluide grâce à Docker et à un réseau interne.
- **CRUD opérationnel** : Le backend expose des API pour effectuer des opérations CRUD sur les données du stock, qui sont stockées et gérées dans MySQL.
- **Gestion des utilisateurs** : L'authentification est gérée par **Keycloak**, offrant une sécurité robuste pour l'accès à l'application.
- **Indépendance des modules Angular** : Chaque module Angular est développé indépendamment, facilitant l'extensibilité de l'application.
- **Base de données initialisée** : La base de données MySQL est initialisée automatiquement avec un fichier `init.sql`, garantissant que les tables nécessaires sont créées lors du démarrage.
- **CI** : L'intégration continue est mise en place pour automatiser les tests et le déploiement de l'application.
- **Healthcheck** : Verification de l'integrité des conteneurs avec des healthcheck.
- **Reseau** : utilisation d'un bridge pour la communication des containers entre eux.
- **Logs** : Creation de logs pour obtenir des informations.
- **Dockerfile** : Création d'image docker optimisé et adapté aux besoins du site.
- **Swagger** : Documentation de type OPENAPI a l'aide de swagger pour le backend.

## Futures améliorations

A terme, il faudrait gérer les autorisation par utilisateurs pour effectuer des requetes uniquement avec les rôles agréés via Keycloak, rajouter le tracing avec Opentélémétrie, rajouter des logs métiers plus précis, sécuriser les connections, cacher les informations sensibles actuellement en clair (mot de passe et autres), faire des micros services plus précis et distinct, automatiser la création et configuration de Keycloak.

## Conclusion

Ce projet démontre l'utilisation efficace des technologies modernes telles que **Docker**, **Angular**, **.NET**, **Keycloak**, **MySQL**, et **NGINX** pour créer une application web robuste et scalable. L'architecture en conteneurs permet une gestion simplifiée et une portabilité entre différents environnements. L'intégration de **Keycloak** pour l'authentification et l'utilisation de **NGINX** comme reverse proxy renforcent la sécurité et les performances de l'application, tandis que la mise en place de l'intégration continue et de la base de données initialisée automatisent le déploiement et la gestion des données.
