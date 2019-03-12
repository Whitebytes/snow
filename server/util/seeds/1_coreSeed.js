
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
        })]
      seeder.randomUser = ()=>{
        return seeder.randomElement(seeder.users)
      }
      var projects =[
        {
          name: "Provincie NH",
          description:`Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
          without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
          to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
          cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
          minutes more. (Discard any mussels that don’t open.)`,
          userOwnerId: seeder.randomUser().id,
          mapProps:'52.6699173,4.8706066,10',
          img: 'https://cdn01.pijpermedia.nl/3VEhyj8QN6mZLqemaPjyiyysPO8=/670x377/smart/https://cdn.indicium.nu/source/panorama/uploads/2016/04/ratten-X5wLXeMr-thumb.jpg'
        },
        { 
          name: "Fotovallen friesland",
          description:` Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
          heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
          browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
          chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
          salt and pepper, and cook, stirring often until thickened and fragrant, about 10
          minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.`,
          userOwnerId: seeder.randomUser().id,
          mapProps:'53.0867964,6.0749829,10',
          img: 'https://paardenpro.nl/wp-content/uploads/fries-paard.jpg'
        }
    ]
    seeder.projects = projects.map(item =>{
      return db.Project.create({
        id:uuid(),
        ...item
      })
    })
    return seeder;
  } 
}

export default seeder;