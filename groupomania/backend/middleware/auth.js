const jwt = require('jsonwebtoken');                                        // Module jsonwebtoken pour configurer les système de jetons

module.exports = (req, res, next) =>  {
    try {                                                                   // Si le jeton correspond   
        const token = req.headers.authorization.split(' ')[1];              // Token attribué à l'utilisateur
        const decodedToken = jwt.verify(token, process.env.TOKEN);      // Token comparé 
        const userId = decodedToken.userId;
        const role = decodedToken.isAdmin;
        if (role === "admin" || req.body.isAdmin && req.body.userId !== userId) {
            throw 'User ID invalide !';
        } 
        else {
            console.log(userId,'Passage par middleware auth')
            next();
        }
    } 
    catch (error) {                                                       // Le jeton ne correspond pas
        res.status(401).json({ error : error | 'Requête non authentifiée !'});
    }
    
};


