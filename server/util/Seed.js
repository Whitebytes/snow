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
seeder.apply = async (db)=>{
  let mnuId=1;  
 
  var user = await db
    .User.create({
      id: '1223ff59-7a5e-4add-ab7c-981f5e3d2237',
      firstName: 'GeertJan',
      lastName: 'Kemme',
      email: 'geertjan@whitebytes.nl',
      password: '$2b$10$7mCWBa6PrsmPKzjaQwOq0e2wErA/L610Jk3hvPgYq1rFm0b80iEh2'
    });
    
    var connector = await db.Connector.create({
      id:uuid(),
      name:'Azure',
      props:{}
    })
  
    listBlobs().then(({blobs})=>{
        blobs.map((item,index)=>{
          var idx = item.name.lastIndexOf('.');
          db.MediaRaw.create({
            id:uuid(),
            name: item.name.substring(0, idx-1),
            type: item.name.substring(idx),
            connectorId:connector.id, //azure
            userOwner: user.id,
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

    try {
      
      
      await db.Module.create({
        id: 1,
        name: 'Projects',
        icon: 'M6.4 9.2h.2c.77 0 1.4.63 1.4 1.4v7c0 .77-.63 1.4-1.4 1.4h-.2c-.77 0-1.4-.63-1.4-1.4v-7c0-.77.63-1.4 1.4-1.4zM12 5c.77 0 1.4.63 1.4 1.4v11.2c0 .77-.63 1.4-1.4 1.4-.77 0-1.4-.63-1.4-1.4V6.4c0-.77.63-1.4 1.4-1.4zm5.6 8c.77 0 1.4.63 1.4 1.4v3.2c0 .77-.63 1.4-1.4 1.4-.77 0-1.4-.63-1.4-1.4v-3.2c0-.77.63-1.4 1.4-1.4z'
      });

      await db.MenuItem.create({
        id: mnuId++,
        name: 'Browse projects',
        url: '/projects',
        moduleId: 1,
        icon: 'M12 9h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1zm0 4h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1zm0 4h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zM20 3H4c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zm-1 16H5V5h14v14z'
      });
      await db.MenuItem.create({
        id: mnuId++,
        name: 'Create project',
        url: '/projects/add',
        moduleId: 1,
        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 11h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z'
      });
      await db.MenuItem.create({
        id: mnuId++,
        name: 'Shared with me',
        url: '/projects/shared',
        moduleId: 1,
        icon: 'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z'
      });

        await db.Module.create({
          id: 2,
          name: 'Media',
          icon: 'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z'
        });
        await db.MenuItem.create({
          id: mnuId++,
          name: 'Browse media',
          url: '/media',
          moduleId: 2,
          icon: 'M10.59 4.59C10.21 4.21 9.7 4 9.17 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-1.41-1.41z'
        });
        await db.MenuItem.create({
          id: mnuId++,
          name: 'Geo media',
          url: '/media/ByGeoLoc',
          moduleId: 2,
          icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'
        });
        await db.MenuItem.create({
          id: mnuId++,
          name: 'Upload media',
          url: '/media/Upload',
          moduleId: 2,
          icon: 'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l4.65-4.65c.2-.2.51-.2.71 0L17 13h-3z'
        });
        await db.MenuItem.create({
            id: mnuId++,
            name: 'Manage labels',
            url: '/media/Labels',
            moduleId: 2,
            icon: 'M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84l3.96-5.58c.25-.35.25-.81 0-1.16l-3.96-5.58z'
          });

          
          await db.Module.create({
            id: 3,
            name: 'Settings',
            icon: 'M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z'
          });

          await db.MenuItem.create({
            id: mnuId++,
            name: 'Github',
            moduleId: 3,
            url: 'https://github.com/Whitebytes/snow',
            icon: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z'
          });

          await db.MenuItem.create({
            id: mnuId++,
            name: 'Manage users',
            moduleId: 3,
            url: '/manage/Users',
            icon: 'M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V18c0 .55.45 1 1 1h9c.55 0 1-.45 1-1v-1.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h6v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z'
          });

          await db.Module.create({
            id: 4,
            name: 'Help center',
            icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92c-.5.51-.86.97-1.04 1.69-.08.32-.13.68-.13 1.14h-2v-.5c0-.46.08-.9.22-1.31.2-.58.53-1.1.95-1.52l1.24-1.26c.46-.44.68-1.1.55-1.8-.13-.72-.69-1.33-1.39-1.53-1.11-.31-2.14.32-2.47 1.27-.12.37-.43.65-.82.65h-.3C8.4 9 8 8.44 8.16 7.88c.43-1.47 1.68-2.59 3.23-2.83 1.52-.24 2.97.55 3.87 1.8 1.18 1.63.83 3.38-.19 4.4z'
          });
          await db.MenuItem.create({
            id: mnuId++,
            name: 'Contact',
            moduleId: 4,
            url: '/help',
            icon: 'M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm.4-4.78c-.01.01-.02.03-.03.05-.05.08-.1.16-.14.24-.02.03-.03.07-.04.11-.03.07-.06.14-.08.21-.07.21-.1.43-.1.68H10.5c0-.51.08-.94.2-1.3 0-.01 0-.02.01-.03.01-.04.04-.06.05-.1.06-.16.13-.3.22-.44.03-.05.07-.1.1-.15.03-.04.05-.09.08-.12l.01.01c.84-1.1 2.21-1.44 2.32-2.68.09-.98-.61-1.93-1.57-2.13-1.04-.22-1.98.39-2.3 1.28-.14.36-.47.65-.88.65h-.2c-.6 0-1.04-.59-.87-1.17.55-1.82 2.37-3.09 4.43-2.79 1.69.25 3.04 1.64 3.33 3.33.44 2.44-1.63 3.03-2.53 4.35z'
          });
          await db.MenuItem.create({
            id: mnuId++,
            name: 'Documents',
            moduleId: 4,
            url: '/help/helpdocs ',
            icon: 'M20 19.59V8.83c0-.53-.21-1.04-.59-1.41l-4.83-4.83c-.37-.38-.88-.59-1.41-.59H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.86.56-1.89.88-3 .82-2.37-.11-4.4-1.96-4.72-4.31-.44-3.35 2.45-6.18 5.83-5.61 1.95.33 3.57 1.85 4 3.78.33 1.46.01 2.82-.7 3.9L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z'
          });

        
      }
      catch(e){console.log(e)}
      
}

export default seeder;