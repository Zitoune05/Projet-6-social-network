const express = require('express');                 
const router = express.Router();                            //Création d'un router avec la méthode .Router() d'express

const commentsCtrl = require('../controllers/commentaire');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Création des routes pour les différentes requêtes 

router.post('/commentaires',commentsCtrl.createComments);


module.exports = router;