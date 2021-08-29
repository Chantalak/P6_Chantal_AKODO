const mongoose = require('mongoose');

//création de notre schéma de données 
const sauceSchema = mongoose.Schema({
    //identifiant généré automatiquement par mongoDB
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    
    likes: { type: Number, required: false, min: 0 }, 
    dislikes: { type: Number, required: false, min: 0 },

    usersLiked: { type: Array, required: false },
    usersDisliked: { type: Array, required: false },
});

//exporte modèle 
module.exports = mongoose.model('Sauce', sauceSchema);