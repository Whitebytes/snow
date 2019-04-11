'use strict';
const uuid = require('uuid/v4'); // ES5
const storage = require('azure-storage');
const blobService = storage.createBlobService();

const getBlobCredentials = (containerName)=>{
    //generate an uploadtoken that is valid for one day..
    var startDate = new Date();
    startDate.setHours(0,0,0,0)
    var expiryDate = new Date(startDate);
    expiryDate.setDate(startDate.getDate() + 1);
 
    var Constants = require('azure-storage/lib/common/util/constants');
    var QueryStringConstants = Constants.QueryStringConstants;
   
    var sharedAccessPolicy = {
        AccessPolicy: {// sequence below does matter!!
            ResourceTypes: "sco" ,
            Permissions:'racwdl',
            //  storage.BlobUtilities.SharedAccessPermissions.READ 
            // + storage.BlobUtilities.SharedAccessPermissions.ADD 
            // + storage.BlobUtilities.SharedAccessPermissions.CREATE
            // + storage.BlobUtilities.SharedAccessPermissions.WRITE ,
            Start: startDate,
            Expiry: expiryDate,
            Services:'bfqt'
        },
    };
    var token =blobService.storageCredentials.generateAccountSignedQueryString(sharedAccessPolicy);
    
    //var token = blobService.generateSharedAccessSignature(containerName, null, sharedAccessPolicy);
   
    console.log("Base URL:\n" + blobService.getUrl(containerName, null, token));
    console.log('=================================')
    console.log("SAS Token:\n" + token);
    console.log('=================================')
    //console.log("Blob Request URL\n" + blobService.getUrl(containerName, blobName, token));
    console.log('=================================')
    //token ='sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2019-04-11T13:51:55Z&st=2019-04-11T05:51:55Z&spr=https&sig=0P1p1nnhgUOz9Lxig%2BkVqF%2BMuuv1%2BKmJVHUYiR%2F6Wno%3D'

    return {
        host: blobService.host,
        token: token
    }

}
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
        },
        size:{
            type: DataTypes.INTEGER,
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
    }
    input File{
        name: String!,
        size: Int!
    }
    type UploadResponse {
        files: [MediaRaw!]!,
        connection: String!,
        container: String!
    }
    `
    MediaRaw.gqlQuery =`queryMediaRaw(clause: String!): [MediaRaw]`
    MediaRaw.gqlMutation=`uploadRequest(fileList: [File!]!, projectId:String!):UploadResponse!`
    MediaRaw.resolvers= (db)=>{
            return {
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
            },
            Mutation:{
                async uploadRequest(_,{fileList, projectId}, {req}){
                    let container = "demo4"
                    var mediaList = fileList.map(async (file)=> {
                        return await MediaRaw.create({
                            id: uuid(),
                            connectorId:'43bbeedf-fa40-4989-8e13-16c40815f5b0',
                            name:file.name,
                            userOwnerId: req.user.id,
                            projectId: db.Project.findOne().id,
                            type: 'file',
                            size:file.size,
                            props:{}
                        })
                    })
                    return {
                        files: mediaList, 
                        connection: JSON.stringify(getBlobCredentials(container)),
                        container: container
                    }
                }
            }
        }
    }
    return MediaRaw;
};
