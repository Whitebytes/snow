'use strict';
const uuid = require('uuid/v4'); // ES5

module.exports = (sequelize, DataTypes) => {
    const Device = sequelize.define('Device', {
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
        description:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        userOwner:{
            type: DataTypes.UUID,
            allowNull: false
        }
    });
    Device.associate = function(models) {
        Device.belongsTo(models.User, {as: 'owner', foreignKey:'userOwner'});
    };
    
    return Device;
};
