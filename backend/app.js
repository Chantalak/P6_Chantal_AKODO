//fichier qui contient notre application 
//importation d'express
const express = require('express');
//importation de cors
const cors = require('cors');
//importation mongoose
const mongoose = require('mongoose');
//importation pour accéder path serveur
const path = require('path');
//importation helmet
const helmet = require('helmet');
const rateLimit = require("./middleware/rateLimit");

//enregistrement router dans application
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://Chantal1:9536731@cluster.ats0o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//application express
const app = express();

app.use(rateLimit);  //empêcher les attaques brutes (rateLimit)
app.use(helmet()); //identifier les éléments protèger par helmet
app.use(helmet.noSniff()); //empêcher le navigateur de contourner l'entête Content-Type
app.use(helmet.hidePoweredBy()); //cacher le powered by Express dans chaque entête de requête
app.use(helmet.ieNoOpen()); //empêcher IE d'éxécuter des téléchargements provenant de page potentiellement malveillante
app.use(helmet.frameguard({ action: 'deny' })); //empêche le click jacking  
app.use(helmet.xssFilter({})); //prévenir les attaques xss

//middleware général appliquer à toutes les requetes envoyées serveurs
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(cors())

//obsolescence bodyparser 
app.use(express.json());

//middleware qui gère image 
app.use('/images', express.static(path.join(__dirname, 'images')));

//enregistrement des routes 
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

//exportation application
module.exports = app;