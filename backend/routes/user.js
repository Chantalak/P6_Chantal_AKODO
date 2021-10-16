//besoin d'express pour créer un router
const express = require('express');
const router = express.Router();
//controller pour associer fonction aux différentes routes
const userCtrl = require('../controllers/user');
const emailVerification = require('../middleware/email-regex');

//création de deux routes post (frontend envoie également infos)
router.post('/signup', emailVerification, userCtrl.signup);
router.post('/login', userCtrl.login);


//exporte le router
module.exports = router;