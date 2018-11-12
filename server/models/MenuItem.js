
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
        }
    });
    MenuItem.associate = function(models) {
        // A user can have many post
        MenuItem.hasMany(models.MenuItem, {as: 'subMenus', foreignKey:'parentId'});
    };
    return MenuItem;
};
const query = {
    async allMenuItems(_,{ctx}) {
        return await MenuItem.all();
    }
}
export {query};
export default model;

