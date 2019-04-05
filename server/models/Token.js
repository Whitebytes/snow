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
        appProps:  {
            type: DataTypes.JSON,
            allowNull: false
        },
        active:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    });
    Token.associate = function(models) {
        Token.belongsTo(models.User, {as: 'owner', foreignKey:'userId'});
    };
    Token.gqlType=`type Token {
        id: ID!
        appName: String!
        appProps: String
    }`
    
    return Token;
};