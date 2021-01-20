const express = require('express');                 
const router = express.Router();                            //Création d'un router avec la méthode .Router() d'express

const likeCtrl = require('../controllers/like');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Création des routes pour les différentes requêtes 
router.get('/', likeCtrl.likeCtrl);
router.post('/', likeCtrl.likeCtrl);


module.exports = router;