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
        })
    };

    

    return Publication;
};