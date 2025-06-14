/* PREAPARTION DES PACKAGE NECESSAIRE */

1- npm init
2- npm install express@4 sequelize bcryptjs mysql2 (installation des package nécessaires tels que Sequelize, MySQL, bcrypt pour le cryptage des mots de passe ainsi que Express)
3- npm install jsonwebtoken
4- npm install multer
5- npm install cors
6- npm install dotenv


/* POUR LE COTE SERVEUR */

1- Créer un fichier .env : 
    * mettre dedans les informations concernant la base de données ( DB_NAME, DB_USER, DB_PASSWORD, DB_HOST)
    * ajouter aussi : JWT_SECRET=ton_secret_super_securise (pour les token)
2- node app.js : pour lancer l'application
3- node server.js : pour lancer le serveur
