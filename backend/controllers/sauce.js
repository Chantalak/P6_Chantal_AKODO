//importation du modèle créé
const Sauce = require('../models/Sauce');
//importation file system 
const fs = require('fs');
//importation cross site scripting
const xss = require('xss')

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        userId: xss(sauceObject.userId),
        name: xss(sauceObject.name),
        manufacturer: xss(sauceObject.manufacturer),
        description: xss(sauceObject.description),
        mainPepper: xss(sauceObject.mainPepper),
        heat : sauceObject.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save().then(
        () => { 
            res.status(201).json({ 
                message: 'La Sauce a été enregistré !'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({ 
                error : error 
            });
        }
    );
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ 
        _id: req.params.id 
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json({ 
                error: error 
            });
        }
    );
}

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'La Sauce a été modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'La Sauce a été supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error 
            });
        }
    );
};

exports.rateSauce = (req, res, next) => {
    //cas 1 : on aime la sauce
    if ( req.body.like === 1 ) {
        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: +1 }, $push: { usersLiked: req.body.userId } })
            .then(() => res.status(200).json({ message: 'Utilisateur a liké une sauce'}))
            .catch(error => res.status(400).json({ error }));
    //cas 2 : aime pas la sauce 
    } else if ( req.body.like === -1 ) {
        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: +1 }, $push: { usersDisliked: req.body.userId } })
            .then(() => res.status(200).json({ message: 'Utilisateur a disliké une sauce'}))
            .catch(error => res.status(400).json({ error }));
    //cas 3 : retire son j'aime ou j'aime pas
    } else {
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { likes : -1 }, $pull: { usersLiked: req.body.userId } })
                        .then(() => res.status(200).json({ message: 'Annule son like'}))
                        .catch(error => res.status(400).json({ error }));
                } else if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
                        .then(() => res.status(200).json({ message: 'Annule son dislike'}))
                        .catch(error => res.status(400).json({ error }));
                }
            })
            .catch(error => res.status(400).json({ error }));
    }
}