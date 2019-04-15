
const uuid = require('uuid/v4'); // ES5
const groningen = { lat: 53.2217873, lng: 6.4956536 }; 

const seeder = {
  getRandomInt: function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  },
  randomElements: (arr,maxCnt, minCnt) => {
    if (!minCnt) minCnt=1;
    var count = seeder.getRandomInt(maxCnt-minCnt)+minCnt;
    var source = [...arr]
    var result = [];
    while (count-->=0){
        var idx = seeder.getRandomInt(source.length);
        result=result.concat(source.splice(idx,1));
    }
    return result 
  },
  randomElement: (arr) => {
    return seeder.randomElements(arr,1)[0];
  },

  apply: async (db)=>{
    seeder.users=[ await db
        .User.create({
          id: '1223ff59-7a5e-4add-ab7c-981f5e3d2237',
          firstName: 'GeertJan',
          lastName: 'Kemme',
          email: 'geertjan@whitebytes.nl',
          password: '$2b$10$7mCWBa6PrsmPKzjaQwOq0e2wErA/L610Jk3hvPgYq1rFm0b80iEh2',
          avatar: '/static/1.jpg'
        }),
        await db .User.create({
          id: '1223ff59-7a5e-4add-ab7c-981f5e3d3672',
          firstName: 'Lude',
          lastName: 'Feldbrugge',
          email: 'lude@fieldworkcompany.n',
          password: '$2b$10$7mCWBa6PrsmPKzjaQwOq0e2wErA/L610Jk3hvPgYq1rFm0b80iEh2',
          avatar: '/static/Lude.jpeg'
        }),
        await db .User.create({
          id: '1223ff59-7a5e-4add-ab7c-981f5e3d3198',
          firstName: 'Jannes',
          lastName: 'Heusinkveld',
          email: 'jannes@fieldworkcompany.n', 
          password: '$2b$10$7mCWBa6PrsmPKzjaQwOq0e2wErA/L610Jk3hvPgYq1rFm0b80iEh2',
          avatar: '/static/Jannes.jpg'
        })]
        db.Token.create({
          id: '3ee6d04f-cf37-4c26-9109-5eb68c4a0b85',
          userId:'1223ff59-7a5e-4add-ab7c-981f5e3d2237',
          appName:'graphql',
          appProps: '{"hostname":"localhost","ip":"::ffff:127.0.0.1","userAgent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36","__typename":"ClientInfo"}',
          active: false
        })
        db.Token.create({
          id: 'e78f508c-ead7-47ed-9f17-44e3fd3b945e',
          userId:'1223ff59-7a5e-4add-ab7c-981f5e3d2237',
          appName:'browser',
          appProps: '{"hostname":"graphQl"}',
          active: false
        })
        db.Token.create({
          id: '03ff1d8a-18af-4bbf-9618-6424effccd53',
          userId:'1223ff59-7a5e-4add-ab7c-981f5e3d2237',
          appName:'browser',
          appProps: '{"hostname":"geertjan-VirtualBox"}',
          active: false
        })
        
        
      seeder.randomUser = ()=>{
        return seeder.randomElement(seeder.users)
      }
     
    return seeder;
  } 
}

export default seeder;