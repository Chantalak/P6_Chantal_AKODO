//création d'un routeur pour exporter dans app
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

//renvoie un tableau de toutes les sauces de la BDD
router.get('/', auth, sauceCtrl.getAllSauce);
//enregistrement des sauces dans la BDD
router.post('/', auth, multer, sauceCtrl.createSauce);
//Renvoie la sauce avec l'id fourni
router.get('/:id', auth, sauceCtrl.getOneSauce);
//modifier une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
//supprimer une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//exporte router du fichier
module.exports = router;