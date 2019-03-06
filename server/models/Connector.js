'use strict';
const uuid = require('uuid/v4'); // ES5

module.exports = (sequelize, DataTypes) => {
    const Connector = sequelize.define('Connector', {
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
        props:{
            type: DataTypes.JSON,
            allowNull: false
        }
    });
    return Connector;
};
