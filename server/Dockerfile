# Utiliser une image Node.js officielle
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY assets/data/data.json /app/data.json

# Installer json-server
RUN npm install -g json-server

# Exposer le port 3324
EXPOSE 3324

# Lancer json-server avec les options spécifiées
CMD ["json-server", "/app/data.json", "--port", "3324", "--static", "/app/assets"]
