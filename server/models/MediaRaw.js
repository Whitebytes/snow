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
        labels:{
            type: DataTypes.TEXT,
            allowNull: true
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
        MediaRaw.belongsTo(models.Project, {as: 'project', foreignKey:'projectId'});
        // MediaRaw.belongsToMany(models.Label, {
        //     through: 'MediaLabels',
        //     as: 'labels',
        //     foreignKey: 'mediaId'
        //   });
    };
    MediaRaw.gqlType=`type MediaRaw {
        id:  ID!
        name: String!
        type: String!
        connectorId: String!
        blobRef: String!
        userOwner: User!
        props: String!,
        project: Project!
        createdAt: String!,
        labels:String
    }`
    MediaRaw.gqlQuery =`queryMediaRaw(clause: String!): [MediaRaw]`
    MediaRaw.resolvers={
        Query: {
            async queryMediaRaw(_,{clause}) {
                var res= await MediaRaw.findAll({
                    include: [{
                        all: true, 
                        nested: true
                    }],
                    order: [
                         ['createdAt', 'ASC']
                    ],
                    where: JSON.parse(clause)}).map(item =>{
                        return {
                            ...item.dataValues,
                            props:JSON.stringify(item.props)
                    }
                })
                return res;
            }
        }
    }
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