
import db from '.././models';

const model = (sequelize, DataTypes) => {
    const MenuItem = sequelize.define('MenuItem', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        icon: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    MenuItem.associate = function(models) {
        // A user can have many post
        MenuItem.hasMany(models.MenuItem, {as: 'subMenus', foreignKey:'parentId'});
        MenuItem.belongsTo(models.Module, {as: 'module', foreignKey:'moduleId'});
    };

    return MenuItem;
};
export default model;
 
