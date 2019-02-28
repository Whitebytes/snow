
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
    return Module;
    
};
export default model;

 