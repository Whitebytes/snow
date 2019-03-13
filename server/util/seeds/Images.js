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
      description:` Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
      heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
      browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
      chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
      salt and pepper, and cook, stirring often until thickened and fragrant, about 10
      minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.`,
      userOwnerId: prevSeeds.randomUser().id,
      mapProps:'53.0867964,6.0749829,10',
      img: 'https://whitebytes.blob.core.windows.net/demo2/f67395d5-78be-4c1c-a268-740849cbc44f'
    })

    createProject('demo3','picsum',{ 
      name: "Provincie NH",
      description:`Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
      without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
      to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
      cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
      minutes more. (Discard any mussels that don’t open.)`,
      userOwnerId: prevSeeds.randomUser().id,
      mapProps:'52.6699173,4.8706066,10',
      img: 'https://cdn01.pijpermedia.nl/3VEhyj8QN6mZLqemaPjyiyysPO8=/670x377/smart/https://cdn.indicium.nu/source/panorama/uploads/2016/04/ratten-X5wLXeMr-thumb.jpg'
    })
}

export default seeder;