const express = require('express');                 
const router = express.Router();                            //Création d'un router avec la méthode .Router() d'express

const commentsCtrl = require('../controllers/commentaire');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Création des routes pour les différentes requêtes 

router.get('/commentaires/:id',commentsCtrl.findAllComments);
router.put('/commentair/:id',commentsCtrl.updateComment);
router.post('/commentaire/:id',commentsCtrl.createComments);
router.get('/commentaires/user/:id',commentsCtrl.getUserCommentaires);
router.get('/commentaire/user/publication/:id',commentsCtrl.getOneComments);
router.delete("/:id",auth, commentsCtrl.deleteComment),

module.exports = router;