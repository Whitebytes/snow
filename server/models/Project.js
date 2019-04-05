'use strict';
const uuid = require('uuid/v4'); // ES5

module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
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
        mapProps:{
            type: DataTypes.STRING,
            allowNull: false
        },
        img:{
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    Project.associate = function(models) {
        Project.belongsTo(models.User, {as: 'userOwner', foreignKey:'userOwnerId'});
    };
    Project.gqlType=`type Project {
        id: ID!
        name: String!
        description: String
        userOwner: User,
        mapProps: String!
        img: String!
        createdAt: String!
    }`
    Project.gqlQuery=`queryProjects(clause: String!):[Project]`
    Project.resolvers= {
        Query: {
            async queryProjects(_,{clause}) {
                return await Project.findAll({include: [{
                    all: true, 
                    nested: false
                }],where: JSON.parse(clause)})
            },
        }
    }
    return Project;
};
