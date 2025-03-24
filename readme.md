# TP noté JS  

## Equipe  
Chris MATHEVET  
Julian MARQUES  

## Présentation  
Le but de ce TP noté est de développer une application de gestion de personnages. Ces personnages peuvent évoluer en fonction des caractéristiques données : la force, l'endurance ainsi que la souplesse. Elles évoluent en fonction des équipements portés. Ces statistiques changent en fonction de tous les équipements qu'ils portent ; ils peuvent être bénéfiques comme négatifs pour le personnage.  

## Les fonctionnalités réalisées  
D'après ce qui est demandé dans le sujet, l'intégralité des fonctionnalités et contraintes a été respectée :  

- Le router dans `app.js`, utilisation de 3 classes : `details`, `listing` et `favoris`.  
- La pagination sur la page listing avec la possibilité de changer le nombre de personnages par page.  
- Lazy loading dans la page favoris, qui, lorsqu'on en a beaucoup, charge les images présentes uniquement sur la partie visible.  
- Les relations dans le JSON, 1-N et N-N :  
  - Un personnage peut avoir un seul équipement pour chaque type (casque, haut, bas et chaussures).  
  - Un même équipement peut être utilisé sur plusieurs personnages.  
- Une page listing avec des cartes de personnages affichant une image et des informations sur le personnage.  
- Une page favoris identique, mais utilisant les favoris stockés dans le `localStorage`.  
- Une page création, où l'on peut créer et modifier un personnage.
- Un outil de recherche permettant de chercher un personnage par son nom.  
- Les clients peuvent cliquer sur un personnage : une pop-up apparaîtra avec toutes les informations sur celui-ci, ainsi que la possibilité de voir la note moyenne et de noter eux-mêmes le personnage.  

Pour les contraintes, nous avons une Single Page Application (SPA), tout est sous forme de modules/classes.  

### Fonctionnalités ajoutées  

- La possibilité de se connecter (seulement via un nom d'utilisateur, l'inscription et la connexion sont identiques).  
- Sur la page principale, nous pouvons voir tous les personnages ou seulement les nôtres.  
- Dans les pop-ups, à la demande de notre professeur, ajout de tous les personnages créés par l'utilisateur du personnage sélectionné.  
- Dans les pop-ups, un bouton modifier/supprimer est disponible lorsque c'est notre personnage, ainsi que la possibilité de "fork" un personnage pour en créer un similaire ou le modifier à partir de cette base.  
- Création d'un personnage avec un nom personnalisé et possibilité de le modifier.  
- Le thème graphique est un style "paint", nous avons donc tout fait en gardant cette thématique.  

## Les fonctionnalités non faites  

Suggestion du professeur : ajouter un système de combat de personnages. Cependant, en raison de toutes les SAE/projets de l'IUT à côté, nous n'avons pas eu le temps de nous lancer dans une quête annexe aussi complexe.  

## Description plus détaillée  

### Créer un personnage  

Sur la page détail, nous avons les statistiques en haut et le personnage à droite avec une flèche à gauche et à droite de chaque équipement.  

Prenons l'exemple du haut : lorsqu'on clique une fois sur la flèche de gauche, nous voyons quelques changements : 3 hauts changent ainsi que les statistiques.  

Qu'est-ce qui se passe exactement ?  
Une fois le clic détecté sur le bouton, nous mettons l'index de l'équipement à jour (si le clic est à gauche, -1, sinon +1 modulo selon le nombre de hauts), puis nous en déduisons les équipements "preview" d'avant et d'après et nous les affichons. Étant donné que nous avons l'équipement courant, nous avons ses valeurs pour chaque statistique, donc nous recalculons tout (50% +/- les valeurs données). Ces calculs sont effectués en fonction de chaque équipement.  

Une fois calculé, pour l'afficher dans la progress bar, nous avons initialement défini 3 variables en CSS pour chacune des statistiques. Avec les valeurs calculées précédemment, il suffit de remplacer les valeurs des variables par celles calculées (qui sont en %) et, grâce à une transition smooth, la progress bar se dessine.  

Le fonctionnement est exactement le même pour chaque équipement !  

### Système de pagination

Sur la page Listing, un système de pagination est disponible. Il est composé d'un système pour changer de page et d'un input pour changer le nombre de personnage par page.

Gràce à JSON Server, et aux arguments de Fetch ```_page=``` (numéro de page) et ```_per_page=```(nombre par page), nous pouvons limiter le nombre de personnage obtenus par la requete. Elle nous renvoie également le nombre de page maximal (selon le nombre par page), qui est utilisé pour afficher la page maximal.

L'utilisateur peut changer ces paramètres via les inputs et boutons en bas de page, ou en changeant l'url (valeurs de : page et perpage).

## Commandes  

### Server JSON  
Pour lancer le serveur, il vous faudra installer `json-server` avec la commande suivante :  
```bash
npm install -g json-server
```  

Une fois installé, pour lancer le serveur, il faudra aller dans le dossier "server" et exécuter la commande :  
```bash
npx json-server assets/data/data.json --port 3000 --static assets
```  

Dans le dossier `server`, il y a le `data.json` dans `assets/data`, mais il y a aussi les fichiers statiques comme les images qui sont dans `assets/img/`. Il faut donc exécuter la commande dans `server/`.  

### Server Web  
Pour lancer le site, il faut aller dans le dossier `client/` et exécuter la commande suivante (il faut bien se mettre dans `client/`, sinon il y aura des problèmes de CORS !) :  
```bash
php -S localhost:8000
```  
