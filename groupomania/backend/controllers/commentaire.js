const models = require('../models');
const Commentaires = models.Commentaire;
const jwt = require('jsonwebtoken');                        //Package pour créer des jetons uniques


// Tous les commentaire d'un message
exports.findAllComments = (req, res, next) => {


    Commentaires.findAll({
        order: [['createdAt', 'DESC']],
        where: {
            publicationId: req.params.id
        },
        include:{ 
           model: models.User,
            attributes: ["username"]
        },
         
    })
    .then(comments => { res.status(200).json(comments), console.log(comments)})
    .catch(error => res.status(400).json({ error }), console.log("erreur findAllComments"))
}

// Creation de publication
exports.createComments = (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1];          // Token attribué à l'utilisateur
    const decodedToken = jwt.verify(token, process.env.TOKEN);      // Token comparé
    
    const comment = new Commentaires(
        {   
            UserId: decodedToken.userId,
            publicationId: req.params.id,
            comments: req.body.comments
        }
    )
    comment.save()
    .then((comment) => res.status(201).json({comment}))
    .catch(error => {res.status(400).json({ error }),console.log(error)})
},

// Récupère une publication pour l'afficher
exports.getOneComments = (req, res, next) => {
  Commentaires.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: models.User,
      attributes: ['username']
    }
  })

  .then((response) => res.status(200).json( response))
  .catch(error => res.status(400).json({ error}));   
};

// Récupère les Commentaires en fonction de l'utilisateur
exports.getUserCommentaires = (req, res, next) => {

    Commentaires.findAll({
        order: [["id", "DESC"]],
        where: { userId: req.params.id },
        include: {
        model: models.User,
        attributes: ["username"] 
    }
    })
    .then(response => res.status(200).json(response))
    .catch(error => res.status(400).json({ error}));   
};

// modifier un commentaire
exports.updateComment = (req, res, next) => {
    Commentaires.update({comments: req.body.comments},
        { where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: "Commentaire modifié !" }))
        .catch(error => res.status(400).json({ error }))
}


// Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    Commentaires.destroy({ where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
        .catch(error => res.status(400).json({ error }))
}
   
