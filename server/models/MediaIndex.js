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
        indexType:{
            type: DataTypes.STRING,
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

    return MediaIndex;
};
/* Sample data*/
