'use strict';

module.exports = (sequelize, DataTypes) => {
    const Publication = sequelize.define(
        'Publication', {
            userId: DataTypes.INTEGER,
            content: DataTypes.STRING,
            imageUrl: DataTypes.STRING
        }, {}
    );

    Publication.associate = function (models) {
        models.Publication.belongsTo(models.User, {
            constraints: false,
            foreignKey: {
                allowNull: false
            },
        }),
        models.Publication.hasMany(models.Commentaire, {
            constraints: false,
            sourceKey: "id",
            foreignKey: {
                allowNull: false
            },
        })
    };

  

    return Publication;
};