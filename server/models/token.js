'use strict';
const uuid = require('uuid/v4'); // ES5
module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define('Token', {
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
    
    return Token;
};