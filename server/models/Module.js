
import db from '.';

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
    
    Module.resolvers={
        Query: {
            async modules(_,{ id},{authUser} ) {
                return await Module.findAll({
                    include: [{
                        all: true, 
                        nested: true
                    }],
                    order: [
                        // Will escape title and validate DESC against a list of valid direction parameters
                        ['id', 'ASC'],
                        ['menuItems','id', 'ASC']
                    ]
                    
                  })
            }
        }
    }

    return Module;
    
};
export default model;

 