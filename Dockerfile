# Utilisez une image de base avec Node.js
FROM node:latest
# Créez le répertoire de travail
WORKDIR /app

RUN apt update

# Copiez les fichiers nécessaires dans le conteneur
COPY package*.json ./
COPY . .

# Installez les dépendances
RUN npm install

# Exposez le port sur lequel votre application Vue.js sera en cours d'exécution
EXPOSE 8080

# Commande pour démarrer l'application
CMD ["npm", "run", "start"]
