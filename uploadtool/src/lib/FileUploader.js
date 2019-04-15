
import settings  from './Settings';
import client  from './Subscriptions';
import {publish} from './MessageBus'
import{ publishFileList } from './Files'
const stringify = require("json-stringify-pretty-compact");

import gql from "graphql-tag";
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

const storage = require('azure-storage');
const uuid = require('uuid/v4'); // ES5

const isDirectory = source => lstatSync(source).isDirectory()
const isFile = source => lstatSync(source).isFile()
const getDirectories = source =>
  readdirSync(source).map(name => join(source, name)).filter(isDirectory)
const getFiles = source =>
  readdirSync(source).map(name => join(source, name)).filter(isFile)

const blobService = null;//storage.createBlobService();

const uploadRequest=`mutation uploadRequest(
    $fileList: [File!]!,
    $projectId: String!
  ){uploadRequest(
    fileList:$fileList,
    projectId:$projectId
  ){files{name, id}, connection, container}}`

const listContainers = async () => {

    return new Promise((resolve, reject) => {
        blobService.listContainersSegmented(null, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `${data.entries.length} containers`, containers: data.entries });
            }
        });
    });
};

const createContainer = async (containerName, blobService) => {
    return new Promise((resolve, reject) => {
        blobService.createContainerIfNotExists(containerName, { publicAccessLevel: 'blob' }, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Container '${containerName}' created` });
            }
        });
    });
};

const uploadString = async (containerName, blobName, text) => {
    return new Promise((resolve, reject) => {
        blobService.createBlockBlobFromText(containerName, blobName, text, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Text "${text}" is written to blob storage` });
            }
        });
    });
};

const uploadLocalFile = async (containerName, filePath, blobName, blobService, progress) => {
    return new Promise((resolve, reject) => {
        //console.log(filePath); return;
        const fullPath = filePath;
        if (!blobName)
            blobName = path.basename(filePath);
        var speedSummary = blobService.createBlockBlobFromLocalFile(containerName, blobName, fullPath, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Local file "${filePath}" is uploaded` });
            }
        });
        speedSummary.on('progress', function () {
            var val = speedSummary.getCompleteSize(false);
            if (progress)
                progress(val);
        });
    });
};

const listBlobs = async (containerName) => {
    return new Promise((resolve, reject) => {
        blobService.listBlobsSegmented(containerName, null, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `${data.entries.length} blobs in '${containerName}'`, blobs: data.entries });
            }
        });
    });
};

const downloadBlob = async (containerName, blobName) => {
    const dowloadFilePath = path.resolve('./' + blobName.replace('.txt', '.downloaded.txt'));
    return new Promise((resolve, reject) => {
        blobService.getBlobToText(containerName, blobName, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Blob downloaded "${data}"`, text: data });
            }
        });
    });
};

const deleteBlob = async (containerName, blobName) => {
    return new Promise((resolve, reject) => {
        blobService.deleteBlobIfExists(containerName, blobName, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Block blob '${blobName}' deleted` });
            }
        });
    });
};

const deleteContainer = async (containerName) => {
    return new Promise((resolve, reject) => {
        blobService.deleteContainer(containerName, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Container '${containerName}' deleted` });
            }
        });
    });
};



const fileName = (row)=>{
    if (row.parent) return fileName(row.parent)+'/'+row.name;
    return row.name
}
const findInTree =(tree,fullName)=>{
    var nameparts = fullName.split('/');
    for (var i=0;i<tree.length;i++){
        var item =tree[i];
        if (item.name==nameparts[0]){
            if (typeof(item.files)!='undefined')
                return findInTree(item.files, 
                    nameparts.slice(1).join('/'));
            else
                 return item
        }
    }
    return null;
}

export const uploadFiles = async (message) => {
    let payload = JSON.parse(message.payload);
    let root = settings.get('path')+settings.get('uploadFolder')
    let files =  payload.files;
    let projectId = payload.projectId
    var fileTree = settings.get('fileTree');
    let uploadList = files.map(file=>{
        let node = findInTree(fileTree, file.name)
        node.progress=0
        return node
    })
    settings.set('fileTree', fileTree);
    settings.save()
    
    //let own server know were gonna upload en get ids for files:
    let uploadResponse = await client.mutate({
        mutation:gql(uploadRequest),
        variables:{
            fileList:uploadList.map(({name, size}) =>({name, size})),
            projectId: projectId //'nu nog door server'
        }
    }).then(res => {return res.data.uploadRequest}).catch(error=>console.log(stringify(error)))

    let connection =JSON.parse(uploadResponse.connection);
    var sasBlobService = storage.createBlobServiceWithSas(connection.host, connection.token);
    let progress = (mediaRawId, size) => val =>{
        publish({
            type:'uploadProgress',
            payload: JSON.stringify({
                progress: Math.min(size, val),
                mediaRawId: mediaRawId,
                size: size
            })
        })
    }

    let queue = uploadResponse.files
        .map((file, index)=>{
            var treeRef = uploadList[index];
            treeRef.mediaRawId = file.id
            treeRef.progress=0
            return {
                fullName :  root+'/'+fileName(treeRef),
                treeRef:treeRef,
                ...file
            }
        })
    settings.save()
    publishFileList(message.sender);

    createContainer(uploadResponse.container, sasBlobService).then(()=>{
        var upload = (ready)=>{
            if (!queue.length)
                return ready()
            var file = queue.shift();
            uploadLocalFile(uploadResponse.container, 
                file.fullName,file.id, sasBlobService, progress(file.id, file.treeRef.size) )
                .then(()=>{
                    file.treeRef.progress=file.treeRef.size
                    progress(file.id, file.treeRef.size)(file.treeRef.size)
                    settings.save()
                    upload(ready)
            })
        }
        upload(()=>{});
    })
}

