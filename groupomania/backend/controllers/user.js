const bcrypt = require('bcrypt');                           // Package pour crypter le mot de passe
const jwt = require('jsonwebtoken');                        //Package pour créer des jetons uniques
require('dotenv').config();  

const emailValidator = require('email-validator');          //plugin de validation d'email
const passWordValidator = require('password-validator');    //plugin de validation de mot de passe

const models = require('../models');

let schemaPassWord = new passWordValidator();   // variable de validation de mot de passe
schemaPassWord 
.is().min(6)                                    //longeur minimale 8
.has().uppercase()                              //Doit avoir des lettres majuscules
.has().lowercase()                              //Doit avoir des lettres minuscules
.has().digits(1)                                //Doit avoir au moins 1 chiffre
.has().not().spaces()                           //Les espaces sont interdits
.is().not().oneOf(['Passw0rd', 'Password123'])  //Liste noire de ces valeurs 


// Fonction d'inscription
exports.signup = (req, res, next) => {    
    const User = models.User;
    let user =req.body
    // hash password
    bcrypt.hash(req.body.password, 10)           
        .then( hash => {
            user.password = hash
            const newUser = new User({             // Création du nouvelle utilisateur  
            username: req.body.username,
            email: req.body.email,
            password: hash,
            });
            newUser.save()     // méthode save pour enregistrer le nouvelle utilisateur dans la base de donnée
                .then(() => res.status(201).json({ response: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));   
    
};

// Fonction de connexion
exports.login = (req, res, next) => {    
    
    let email = req.body.email;
    let password = req.body.password;
    let TOKEN = process.env.TOKEN;

    models.User.findOne({ where: { email: email }})     // Méthode findOne pour trouver l'utilisateur dans la base de donnée correspondant à l'adresse mail envoyé dans la requête 
        .then(user => {
            if (!user) {                        // Si l'utilisateur n'est pas trouvé dans la base de donnée
            return res.status(401).json({ error: 'Utilisateur introuvable !' });    // Affiche un status et message d'erreur
            }
            bcrypt.compare(password, user.password)    //fonction pour comparer le mot de passe entré dans la requête avec le mot de passe dans la base de données
                .then(valid => {
                    if (!valid) {                               //si le mot de passe est différent, renvoie un message d'erreur
                        return res.status(401).json({ error: 'Mot de passe incorrect !' }); 
                    }
                    else {
                        let role = ""
                        if(user.isAdmin === true){
                            this.role = "admin"
                        }
                        else if(user.isAdmin === false){
                            this.role = "user"
                        }
                    }
                    res.status(200).json({                      // Requête validé avec un objet json contenant
                        userId: user.id,                       // L'identifiant de l'utilisateur dans la base de donnée
                        role: this.role,
                        token: jwt.sign(                        // On génére un token valable pendant 24h
                            { userId: user.id , role: this.role},
                                TOKEN,
                            { expiresIn: '24h' },
                        ),
                        username: user.username,
                        email: user.email,
                    });
                })
                .catch(() => res.status(500).json({ error : "erreur serveur"}));   //Erreur serveur
            })
        .catch(error => res.status(500).json({ error }));       //Erreur serveur
};

// Fonction userProfil
exports.userProfil = (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1];          // Token attribué à l'utilisateur
    const decodedToken = jwt.verify(token, process.env.TOKEN);      // Token comparé 
    const userId = decodedToken.userId;

    models.User.findOne({ attributes: [ 'id', 'email', 'username', "password"], where : { id: userId } })       
        .then((user) => res.status(200).json({ user }))     // On affiche seulement les informations non sensibles
        .catch((err) => res.status(401).json({ err }));
};   

// Récupère toute les utilisateurs dans la base de données pour les affichers
exports.getAllUsers = (req, res, next) => {        

    models.User.findAll({ 
      order: [['createdAt', 'DESC']], 
    })
    .then((User) => res.status(200).json(User))
    .catch(error => res.status(400).json( error ));                                  
};

// Fonction updateProfil
exports.updateUser =  (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1];          // Token attribué à l'utilisateur
    const decodedToken = jwt.verify(token, process.env.TOKEN);      // Token comparé 
    const userId = decodedToken.userId; 
    console.log(req.body.password)
    bcrypt.hash(req.body.password, 10) 
    .then(hash=> { 
        
        
        console.log("=======================================")
        console.log(hash)
        models.User.update({ 
        username: req.body.username,
        email: req.body.email,
        password: hash ,
        },{ attributes: ['id'], where : { id: userId } },
        )
        .then((response) => res.status(200).json( response ))     
        .catch((err) => res.status(401).json({ err }))
    }
    // On affiche seulement les informations non sensibles

    )};


// Fonction deleteProfil
exports.deleteUser =  (req, res, next) => {
    
    models.User.destroy({ where: { id: req.params.id } })       // Destruction de l'utilisateur correspondant dans la base de données
        .then((response) => res.status(200).json({ response : " Compte supprimés de la basse de donnée" }))   
        .catch((err) => res.status(401).json({ err }));

};