if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}
import download  from './ImageDownloader';
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

const blobService = storage.createBlobService();

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

const createContainer = async (containerName) => {
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

const uploadLocalFile = async (containerName, filePath, blobName) => {
    return new Promise((resolve, reject) => {
        //console.log(filePath); return;
        const fullPath = filePath;
        if (!blobName)
            blobName = path.basename(filePath);
        blobService.createBlockBlobFromLocalFile(containerName, blobName, fullPath, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Local file "${filePath}" is uploaded` });
            }
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

const containerName = "demo3";
const blobName = "quickstart.txt";
const content = "hello Blob SDK";
const localFilePath = "./readme.md";

const execute = async () => {

   
    let response;
/*
    console.log("Containers:");
    response = await listContainers();
    response.containers.forEach((container) => console.log(` -  ${container.name}`));

    const containerDoesNotExist = response.containers.findIndex((container) => container.name === containerName) === -1;

    if (containerDoesNotExist) {
        await createContainer(containerName);
        console.log(`Container "${containerName}" is created`);
    }

    await uploadString(containerName, blobName, content);
    console.log(`Blob "${blobName}" is uploaded`);

    response = await uploadLocalFile(containerName, localFilePath);
    console.log(response.message);

    console.log(`Blobs in "${containerName}" container:`);
    response = await listBlobs(containerName);
    response.blobs.forEach((blob) => console.log(` - ${blob.name}`));

    response = await downloadBlob(containerName, blobName);
    console.log(`Downloaded blob content: ${response.text}"`);

    await deleteBlob(containerName, blobName);
    console.log(`Blob "${blobName}" is deleted`);

    await deleteContainer(containerName);
    console.log(`Container "${containerName}" is deleted`);

}
[...Array(300)].fill(0).map(async (__, idx) => {
    var fileName = 'Downloads/file'+(''+idx).padStart(3,'0')+'.jpg';
    try{
    download(
        'https://picsum.photos/1000/1000/?random&k'+idx, 
        fileName, 
        async ()=>{
            let response = await uploadLocalFile(containerName, fileName);
            console.log(response);
        }
    );
    } catch(e){
        console.log(e);
    }
  */ 
    const groningen = { lat: 53.2217873, lng: 6.4956536 }; 
    
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }
    // let indexFile={}
    // indexFile.LoremPicsum=[];
    // await listBlobs(containerName).then(({blobs})=>{
    //     blobs.map((item,index)=>{
    //     var now=new Date();
    //     var idx = item.name.lastIndexOf('.');
    //     indexFile.LoremPicsum.push({
    //         id:uuid(),
    //         name:item.name.substring(0, idx-1),
    //         type: item.name.substring(idx),
    //         createdAt: new Date().setDate(now.getDate()-getRandomInt(30)),
    //         lat: groningen.lat +
    //             0.01 * index *
    //             Math.sin(30 * Math.PI * index / 180) *
    //             Math.cos(50 * Math.PI * index / 180) + Math.sin(5 * index / 180),
    //         lng: groningen.lng +
    //             0.01 * index *
    //             Math.cos(70 + 23 * Math.PI * index / 180) *
    //             Math.cos(50 * Math.PI * index / 180) + Math.sin(5 * index / 180)
    //         })
    //     });
       
    // }) 
    //await deleteContainer(containerName);
    // const root = '/home/geertjan/Downloads/golmbach, reconyx/golmbach, reconyx';
    // var dirs = getDirectories(root);
    // var indexFile = {}
    // await createContainer(containerName).then(()=>{
       
    //     dirs.forEach(dirName => {
    //         let projectName =  dirName.substr(root.length+1);
    //         indexFile.vidval=[]
    //         getFiles(dirName).map((fullname, index)=>{
    //             let fileName = fullname.substr(dirName.length+1);
    //             var now=new Date();
    //             var idx = fileName.lastIndexOf('.');
    //             var fileC = {
    //                 id:uuid(),
    //                 name:fileName.substring(0, idx-1),
    //                 type: fileName.substring(idx),
    //                 createdAt: new Date().setDate(now.getDate()-getRandomInt(30)),
    //                 lat: groningen.lat +
    //                     0.01 * index *
    //                     Math.sin(30 * Math.PI * index / 180) *
    //                     Math.cos(50 * Math.PI * index / 180) + Math.sin(5 * index / 180),
    //                 lng: groningen.lng +
    //                     0.01 * index *
    //                     Math.cos(70 + 23 * Math.PI * index / 180) *
    //                     Math.cos(50 * Math.PI * index / 180) + Math.sin(5 * index / 180),
    //                 labels: [projectName]
    //                 }
    //             indexFile.vidval.push(fileC);
    //             console.log(containerName, fullname, fileC.id);
    //             uploadLocalFile(containerName, fullname, fileC.id );
    //         })
            
    //     })
    // })
    
    const root = '/home/geertjan/Downloads/Downloads/';
    //await deleteContainer(containerName);
    var indexFile = {}
    indexFile.picsum=[]
    let projectName='picsum'
    await createContainer(containerName).then(()=>{
        getFiles(root).map((fullname, index)=>{
            let fileName = fullname.substr(root.length+1);
            var now=new Date();
            var idx = fileName.lastIndexOf('.');
            var fileC = {
                id:uuid(),
                name:fileName.substring(0, idx-1),
                type: fileName.substring(idx),
                createdAt: new Date().setDate(now.getDate()-getRandomInt(30)),
                lat: groningen.lat +
                    0.01 * index *
                    Math.sin(30 * Math.PI * index / 180) *
                    Math.cos(50 * Math.PI * index / 180) + Math.sin(5 * index / 180),
                lng: groningen.lng +
                    0.01 * index *
                    Math.cos(70 + 23 * Math.PI * index / 180) *
                    Math.cos(50 * Math.PI * index / 180) + Math.sin(5 * index / 180),
                labels: [projectName]
                }
            indexFile.picsum.push(fileC);
            console.log(containerName, fullname, fileC.id);
            uploadLocalFile(containerName, fullname, fileC.id );
        })
    })
    let txt = JSON.stringify(indexFile);
    await uploadString(containerName, "index.json", txt);
    console.log(txt)
}


execute().then(() => console.log("Done")).catch((e) => console.log(e));
