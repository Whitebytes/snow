if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const uuid = require('uuid/v4'); // ES5
const storage = require('azure-storage');

const blobService = storage.createBlobService();
const groningen = { lat: 53.2217873, lng: 6.4956536 }; 

const downloadBlob = async (containerName, blobName) => {
  //const dowloadFilePath = path.resolve('./' + blobName.replace('.txt', '.downloaded.txt'));
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

const listBlobs = async () => {
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

const seeder = {};
seeder.apply = async (db, prevSeeds)=>{
 // return prevSeeds; //temp!!
  var connector = await db.Connector.create({
      id:uuid(),
      name:'Azure',
      props:{}
    })

    const createProject = async (containerName, propname, project)=>{
      var project =await db.Project.create({
        id:uuid(),
        ...project
      })

      var blobs = await downloadBlob(containerName, 'index.json').then()
        .then(response =>{
          var blobs =JSON.parse(response.text)[propname]
          return blobs;
        })
  
      blobs.map((item,index)=>{
        var user = prevSeeds.randomUser();

        db.MediaRaw.create({
          id:uuid(),
          name: item.name,
          type: item.name,
          connectorId:connector.id, //azure
          userOwnerId: prevSeeds.randomUser().id,
          projectId: project.id,
          createdAt: item.createdAt,
          labels: JSON.stringify(item.labels),
          blobRef: `https://whitebytes.blob.core.windows.net/${containerName}/${item.id}`,
          props:{
            lat: item.lat,
            lng: item.lng
          }
        })
      })
    };
    createProject('demo2','vidval',{ 
      name: "Fotovallen friesland",
      description:`Hardware: Reconyx HS2X


      At Greenpix we provide a full solution to all your imagery data needs.  Using UAV’s, Motion detectors, intervalometers, under water rovers with camera rigs (depending on the requirements) 
      we have a wide array of tools to gather all the data you desire, on every location imaginable.`,
      userOwnerId: prevSeeds.randomUser().id,
      mapProps:'53.0867964,6.0749829,10',
      img: 'https://whitebytes.blob.core.windows.net/demo2/f67395d5-78be-4c1c-a268-740849cbc44f'
    })

    createProject('demo3','picsum',{ 
      name: "Krabbenscheer",
      description:`Krabbenscheer:

      Hardware: DJI Inspire     
      Mapping, stitching en bepaling bedekkingsgraad Krabbenscheer voor Waterschappen`,
      userOwnerId: prevSeeds.randomUser().id,
      mapProps:'52.6699173,4.8706066,10',
      img: 'https://greenpix.nl/wp-content/uploads/2016/12/DJI_0623-1.jpg'
    })
}

export default seeder;