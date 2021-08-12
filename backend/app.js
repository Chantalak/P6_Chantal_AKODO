//fichier qui contient notre application 
//importation d'express
const express = require('express');
//importation mongoose
const mongoose = require('mongoose');
const path = require('path');

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

//middleware général appliquer à toutes les requetes envoyées serveurs
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//obsolescence bodyparser 
app.use(express.json());

//middleware qui gère image 
app.use('/images', express.static(path.join(__dirname, 'images')));

//enregistrement des routes 
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

//exportation application
module.exports = app;