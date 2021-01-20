const multer = require('multer');               // Package qui nous permet de gérer les fichiers entrants dans les requêtes HTTP
                                          
const MIME_TYPES = {                            // On définis les formats authorisés 
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif':  'gif',
};

const storage = multer.diskStorage({            // Fonction diskStorage pour enregistrer sur le disk
    destination: (req, file, callback) => {     // Element expliquant dans quelle dossier enregistrer les fichiers
        console.log("ok");
        callback(null, 'images')
    },
    filename: (req, file, callback) =>{         // Element expliquant quelle nom de fichier utiliser
        console.log("ok2");
        const name = file.originalname.split(' ').join('_');        // Nouveau nom pour le fichier (nom d'origine en remplacant les espaces par _ )
        const extension = MIME_TYPES[file.mimetype];              // Création de l'extension du fichier correspondant au minetype envoyé oar le frontend
        callback(null, name + Date.now() + '.' + extension);        // Nom du fichier + l'heure et la date d'enregistrement (pour rendre le fichier unique) + son extension
    }
});

// On exporte notre middlewares en lui passant notre constante storage et lui indiquons que nous gérerons uniquement les téléchargements de fichiers image
module.exports = multer({storage: storage}).single('image');       