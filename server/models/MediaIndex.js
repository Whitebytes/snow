'use strict';
const uuid = require('uuid/v4'); // ES5

module.exports = (sequelize, DataTypes) => {
    const MediaIndex = sequelize.define('MediaIndex', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false
        },
        mediaRawId:{
            type: DataTypes.UUID,
            allowNull: false
        },
        engineId:{
            type: DataTypes.UUID,
            allowNull: false
        },
        props:{
            type: DataTypes.JSON,
            allowNull: false
        },
        blobRef:{
            type: DataTypes.STRING
        }
    });
    MediaIndex.associate = function(models) {
        // A user can have many post
        MediaIndex.belongsTo(models.MediaRaw, {as: 'indexOf', foreignKey:'mediaRawId'});
    };
    MediaIndex.associate = function(models) {
        // A user can have many post
        MediaIndex.belongsTo(models.Engine, {as: 'generatedBy', foreignKey:'engineId'});
    }; 

    return MediaIndex;
};
/* Sample data*/
