'use strict';
const uuid = require('uuid/v4'); // ES5

module.exports = (sequelize, DataTypes) => {
    const Engine = sequelize.define('Engine', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false
        },
    
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        userOwner:{
            type: DataTypes.UUID,
            allowNull: false
        },
        props:{
            type: DataTypes.JSON,
            allowNull: false
        }
    });
    Engine.associate = function(models) {
        // A user can have many post
        Engine.belongsTo(models.User, {as: 'inventor', foreignKey:'userOwner'});
    };

    return Engine;
};
/* Sample data*/
