//fichier qui contient notre application 
//importation d'express
const express = require('express');
//importation mongoose
const mongoose = require('mongoose');

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

app.post ('/api/sauces', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Objet créé !'
    });
});

app.use('/api/sauces', (req, res, next) => {
    const sauce = [
        {
            _Id : 'ncncnzdnd',
            name: 'nom de la sauce',
            manufacturer: 'fabricant de la sauce',
            description : 'description de la sauce',
            mainPepper : 'principal ingrédient épicé de la sauce',
            imageUrl : 'https://cdn.shoplightspeed.com/shops/638577/files/25050471/chuck-hughes-sauce-piquante.jpg',
            heat : '1',
            likes : '70',
            dislikes : '20',
            usersLiked : "String <userId>",
            usersDisliked : "String <userId>",
            userID : 'rooooooooo',
        },
        {
            _Id : 'ncncnzdnd',
            name: 'nom de la sauce',
            manufacturer: 'fabricant de la sauce',
            description : 'description de la sauce',
            mainPepper : 'principal ingrédient épicé de la sauce',
            imageUrl : 'https://cdn.shoplightspeed.com/shops/638577/files/25050471/chuck-hughes-sauce-piquante.jpg',
            heat : '1',
            likes : '70',
            dislikes : '20',
            usersLiked : "String <userId>",
            usersDisliked : "String <userId>",
            userID : 'rooooooooo',
        },
    ];
    res.status(200).json(sauce);
});

//exportation application
module.exports = app;