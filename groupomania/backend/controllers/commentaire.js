const models = require('../models');
const Commentaires = models.Commentaire;
const jwt = require('jsonwebtoken');                        //Package pour créer des jetons uniques

// Creation de publication 
exports.createComments = (req, res, next) => {
  
    const comment = new Commentaire(
        {
            userId: req.body.userId,
            publicationId: req.body.publicationId,
            comments: req.body.comments
        }
    )
    comment.save()
    .then(() => res.status(201).json({ message: "Commentaire ajouté avec succé !" }))
    .catch(error => res.status(400).json({ error }))
} 
//     const token = req.headers.authorization.split(" ")[1];          // Token attribué à l'utilisateur
//     const decodedToken = jwt.verify(token, process.env.TOKEN);      // Token comparé 
//     const userId = decodedToken.userId; 
    
    
//     // Params
//     let comments = req.body.content;
  
//     if (comments == null) {
//       return res.status(400).json({ 'error': 'Paramètre manquant ' });
//     }
  
//     models.User.findOne({attributes: [ "id" ], where: { id: userId } })
//         .then(
//         models.Publication.findOne({ attributes: ['id'], where: { id: req.params.id } })
//             .then(
//                 models.Commentaire.create({
//                     comments: req.body.comments,
//                 })
//                 .then((response) => res.status(200).json({ response : " Publication commentée avec succé !" }))
//                 .catch((err) => res.status(401).json({ err }))
//             )     
//             .catch(() => res.status(500).json({ 'error': 'unable to verify publication' }))
//         )
//         .catch(() => res.status(500).json({ 'error': 'unable to verify user' }))
  
// };
// // 
// exports.createComments = (req, res, next) => {        
  
//     const token = req.headers.authorization.split(" ")[1];          // Token attribué à l'utilisateur
//     const decodedToken = jwt.verify(token, process.env.TOKEN);      // Token comparé 
//     const userId = decodedToken.userId; 

//     // Params
//     let comments = req.body.comments;

//     if (comments == null) {
//     return res.status(400).json({ 'error': 'Paramètre manquant ! ' });
//     }

//     models.Publication.findOne({ attributes: ['id'], where: { id: req.params.id } })
//     .then(
//         models.Commentaire.create({ 
//             include:[
//             models.User , models.publications
//             ]
//         })
//         .then((commentaires) => res.status(200).json(commentaires))
//         .catch(error => res.status(400).json({ error: "createComments", error: error }),console.log("erreur de createComments"))         
//     )
//     .catch(() => res.status(500).json({ 'error': 'unable to verify publication' }))
                         
// };