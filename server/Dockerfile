# Utiliser une image Node.js officielle
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY assets/data/data.json /app/data/data.json
COPY assets/ /app/assets

# Installer json-server
RUN npm install -g json-server

# Exposer le port 3000
EXPOSE 3234

# Lancer json-server avec les options spécifiées
CMD ["json-server", "/app/data/data.json", "--port", "3234", "--static", "/app/assets"]
