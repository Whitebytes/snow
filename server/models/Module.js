
import db from '.';
2
let cliMod={
    id: 301,
    name: 'Clients',
    icon: 'M17 16l-4-4V8.82C14.16 8.4 15 7.3 15 6c0-1.66-1.34-3-3-3S9 4.34 9 6c0 1.3.84 2.4 2 2.82V12l-4 4H3v5h5v-3.05l4-4.2 4 4.2V21h5v-5h-4z',
    menuItems:[{
        id:302,
        name: 'Clients',
        url: '/clients',
        moduleId: 301,
        icon: 'M12 9h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1zm0 4h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1zm0 4h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zM20 3H4c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zm-1 16H5V5h14v14z'
        }]

  };

const cliMenu =   {
    id: 1,
    name: 'local pc',
    moduleId: 301
  };

const localPcIcon = 'M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2h-4zM4 5h16v11H4V5zm8 14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z'
const browsericon = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
const model = (sequelize, DataTypes) => {
    const Module = sequelize.define('Module', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        icon: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    Module.associate = function(models) {
        // A user can have many post
        Module.hasMany(models.MenuItem, {as: 'menuItems', foreignKey:'moduleId'});
      
    };
    Module.gqlType=`
    type Module {
        id: Int!
        name: String!
        icon: String
        menuItems: [MenuItem]
    }`
    Module.gqlQuery=`modules:[Module]`
    
    Module.resolvers = (db) =>{ return {
        Query: {
            async modules(_,{ id},{authUser} ) {
                let mods =  await Module.findAll({
                    include: [{
                        all: true, 
                        nested: true
                    }], 
                    order: [
                        // Will escape title and validate DESC against a list of valid direction parameters
                        ['id', 'ASC'],
                        ['menuItems','id', 'ASC']
                    ]
                    
                  }).map((item) => item)
                  if (authUser){ 
                      let idx=303;
                    let xtrMod = Object.assign({},cliMod)
                    xtrMod.menuItems=cliMod.menuItems.concat( 
                        (await db.Token.findAll({
                            where:{userId: authUser.id, active:true}
                        }))
                        .map((token)=>{
                            var isBrowser =token.appName=='Browser';
                            var appProps =   {hostname: 'local pc', ...JSON.parse(token.appProps)}
                            var name = isBrowser? 'Browser' :appProps.hostname
                            var url ='/clients/client?id='+token.id
                            return { ...cliMenu,
                                id:idx++, 
                                name: name,
                                url: url,
                                icon: token.appName=='Browser' ? browsericon: localPcIcon
                                }
                            }))
                        mods.push(xtrMod)
                }
 
                return mods;
            }
        }
    }
    }

    return Module;
    
};
export default model;

 