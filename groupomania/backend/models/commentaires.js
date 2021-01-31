'use strict';

module.exports = (sequelize, DataTypes) => {
  const Commentaire = sequelize.define(
    'Commentaire', {
        comments: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        publicationId: DataTypes.INTEGER,
    }, {}
  );

  Commentaire.associate = function (models) {
    models.Commentaire.belongsTo(models.Publication,{
      foreignKey: {
        allowNull: false
      }
  })
  };

  Commentaire.associate = function (models) {
    models.Commentaire.belongsTo(models.User,{
      foreignKey: {
        allowNull: false
      }
  })
  };

  return Commentaire;
};

// const { Model } = require("sequelize")

// module.exports = (sequelize, DataTypes) => {
//     class Commentaire extends Model {}
//     Commentaire.init({
//         comments: {
//             type: DataTypes.STRING
//         }
//     },
//     {
//         sequelize,
//         modelName: "Commentaire"
//     })
//     return Commentaire
// }

// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   let Commentaire = sequelize.define('Commentaire', {
//     publicationId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'Publication',
//         key: 'id'
//       }
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'User',
//         key: 'id'
//       }
//     },
//     comments: DataTypes.INTEGER
//   }, {});
//   Commentaire.associate = function(models) {
//     // associations can be defined here

//     models.User.belongsToMany(models.Publication, {
//       through: models.Commentaire,
//       foreignKey: 'userId',
//       otherKey: 'publicationId',
//     });

//     models.Publication.belongsToMany(models.User, {
//       through: models.Commentaire,
//       foreignKey: 'publicationId',
//       otherKey: 'userId',
//     });

//     models.Commentaire.belongsTo(models.User, {
//       foreignKey: 'userId',
//       as: 'user',
//     });

//     models.Commentaire.belongsTo(models.Publication, {
//       foreignKey: 'publicationId',
//       as: 'publication',
//     });
//   };
//   return Commentaire;
// };

// // 'use strict';
// // const {
// //   Model
// // } = require('sequelize');
// // module.exports = (sequelize, DataTypes) => {
// //   class Commentaire extends Model {
// //     /**
// //      * Helper method for defining associations.
// //      * This method is not a part of Sequelize lifecycle.
// //      * The `models/index` file will call this method automatically.
// //      */
// //     static associate(models) {
// //       // define association here
// //     }
// //   };
// //   Commentaire.init({
// //     publicationId: DataTypes.INTEGER,
// //     references: {
// //       model: 'Publication',
// //       key: 'id'
// //     },
// //     userId: DataTypes.INTEGER,
// //     references: {
// //       model: 'User',
// //       key: 'id'
// //     },
// //     comments: DataTypes.STRING
// //   }, {
// //     sequelize,
// //     modelName: 'comments',
// //   });
// //   return Commentaire;
// // };