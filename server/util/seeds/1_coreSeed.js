
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
          id: 'e78f508c-ead7-47ed-9f17-44e3fd3b945e',
          userId:'1223ff59-7a5e-4add-ab7c-981f5e3d2237',
          appName:'graphql',
          appProps: '{nene:none}',
          active: false
        })
      seeder.randomUser = ()=>{
        return seeder.randomElement(seeder.users)
      }
     
    return seeder;
  } 
}

export default seeder;