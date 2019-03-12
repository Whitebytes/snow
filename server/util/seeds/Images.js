if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const uuid = require('uuid/v4'); // ES5
const storage = require('azure-storage');
const containerName = 'demo';
const blobService = storage.createBlobService();
const groningen = { lat: 53.2217873, lng: 6.4956536 }; 

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

  var connector = await db.Connector.create({
      id:uuid(),
      name:'Azure',
      props:{}
    })

  listBlobs().then(({blobs})=>{
      blobs.map((item,index)=>{
        var user = prevSeeds.randomUser();
        var idx = item.name.lastIndexOf('.');
        var now=new Date();
        db.MediaRaw.create({
          id:uuid(),
          name: item.name.substring(0, idx-1),
          type: item.name.substring(idx),
          connectorId:connector.id, //azure
          userOwnerId: prevSeeds.randomUser().id,
          createdAt: new Date().setDate(now.getDate()-prevSeeds.getRandomInt(30)),
          blobRef: `https://whitebytes.blob.core.windows.net/${containerName}/${item.name}`,
          props:{
            lat: groningen.lat +
              0.01 * index *
              Math.sin(30 * Math.PI * index / 180) *
              Math.cos(50 * Math.PI * index / 180) + Math.sin(5 * index / 180),
          lng: groningen.lng +
            0.01 * index *
            Math.cos(70 + 23 * Math.PI * index / 180) *
            Math.cos(50 * Math.PI * index / 180) + Math.sin(5 * index / 180)
          }
        })
      })
    }) 
     
}

export default seeder;