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
