//importe mongoose
const mongoose = require('mongoose');
//ajout du validator comme plugin à notre schéma
const uniqueValidator = require('mongoose-unique-validator');

//création d'un schéma
const userSchema = mongoose.Schema({
    //unique empêche deux utilisateurs d'avoir la même adresse mail
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

//exporte le modèle
module.exports = mongoose.model('User', userSchema);