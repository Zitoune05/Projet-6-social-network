'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', {
            email: DataTypes.STRING,
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            isAdmin: DataTypes.BOOLEAN
        }, {}
    );

    User.associate = function (models) {
        models.User.hasMany(models.Publication,{ onDelete: 'cascade', onUpdate: 'cascade', hooks:true })
    };

    User.associate = function (models) {
        models.User.hasMany(models.Commentaire,{ onDelete: 'cascade', onUpdate: 'cascade', hooks:true })
    };

    return User;
};