'use strict';
const uuid = require('uuid/v4'); // ES5


const model = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    User.associate = function(models) {
        // A user can have many post
        User.hasMany(models.Token, {as: 'accessTokens', foreignKey:'userId'});
    };
    User.beforeCreate((user, _ ) => {
        return user.id = uuid(); 
    })
    return User;
}


export default model;
