'use strict';
const uuid = require('uuid/v4'); // ES5

module.exports = (sequelize, DataTypes) => {
    const MediaRaw = sequelize.define('MediaRaw', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false
        },
        connectorId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false
        },
        type:{
            type: DataTypes.STRING,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        blobRef:{
            type: DataTypes.STRING(250)
        },
       
        props:{
            type: DataTypes.JSON,
            allowNull: false
        }
    });
    MediaRaw.associate = function(models) {
        // A user can have many post
        MediaRaw.belongsTo(models.User, {as: 'userOwner', foreignKey:'userOwnerId'});
        MediaRaw.belongsToMany(models.Label, {
            through: 'MediaLabels',
            as: 'labels',
            foreignKey: 'mediaId'
          });
    };
 
    return MediaRaw;
};
/* Sample data 
    id:     1,
    name:   'kittens',
    type:   'jpg',
    props:  '{
            lens: 'carl zeiss',
            camara: 'nikon'
    }',
    connector: 1 //<-eg Azure
*/