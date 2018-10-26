'use strict';
const uuid = require('uuid/v4'); // ES5
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Token', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: uuid(),
            allowNull: false
        },
        appName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        appPropeties:  {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    User.associate = function(models) {
        // A user can have many post
        User.hasMany(models.Token, {as: 'accessTokens', foreignKey:'userId'});
    };
    return User;
};