//package de cryptage 
const bcrypt = require ('bcrypt')
//permet de créer des tokens et de les vérifier
const jwt = require('jsonwebtoken');
//modèle user
const User = require('../models/User')

//méthode avec deux middleware 
//création de nouveaux user dans la BDD
exports.signup = (req, res, next) => {
    //hasage du mot de passe dans une fonction asynchrone
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        //avec hashage créé par bcrypt enregistre user dans BDD
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//fonction permettant user existant de se connecter
exports.login = (req, res, next) => {
    //cherche user dont email correspond celui BDD
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        //quand on trouve le bon user 
        //bcrypt compare MDP user avec hash enregistré avec user
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                //si tout est bon renvoie userID + token à user
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
            })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};