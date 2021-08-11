//configuration de multer 
const multer = require('multer');

//générer extension fichier 
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//création objet de configuration pour multer
const storage = multer.diskStorage({
    //fonction qui explique à multer où enregistrer les fichiers 
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    //explique à multer nom de fichier à utiliser 
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

//exporter middleware multer configuré
module.exports = multer({storage: storage}).single('image');