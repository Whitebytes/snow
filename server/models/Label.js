'use strict';
const uuid = require('uuid/v4'); // ES5

module.exports = (sequelize, DataTypes) => {
    const Label = sequelize.define('Label', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
        },
        userOwner:{
            type: DataTypes.UUID,
            allowNull: false
        },
        created: {
            type: DataTypes.DATE,
            allowNull: false
        },
        modified: {
            type: DataTypes.DATE,
            allowNull: false
        },
        props:{
            type: DataTypes.JSON,
            allowNull: false
        }
    });
    Label.associate = function(models) {
        // A user can have many post
        Label.belongsTo(models.User, {as: 'owner', foreignKey:'userOwner'});
    };
    Label.associate = (models) => {
        Label.belongsToMany(models.Label, {
          through: 'LabelGraph',
          as: 'labels',
          foreignKey: 'parentLabelId'
        });
      };
    return Label;
};