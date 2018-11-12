const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

var config    = require(__dirname + '/../config/config.js')[env];
const db = {};

const addUser=`INSERT INTO 
Users (id,firstName,lastName,email,password,createdAt,updatedAt)
VALUES ('1223ff59-7a5e-4add-ab7c-981f5e3d2237','geertjan','kemme','gj@qemme.nl','$2b$10$7mCWBa6PrsmPKzjaQwOq0e2wErA/L610Jk3hvPgYq1rFm0b80iEh2','2018-10-30 11:50:52','2018-10-30 11:50:52');`



let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
/*db.sequelize.sync({force: true})
  .then(()=>{db.sequelize.query(addUser)})*/

  for (var n in sequelize.models){
    var attr =sequelize.models[n].rawAttributes;
    for (var m in attr){
      console.log(attr[m].type.constructor.name)
    }
  }

module.exports = db;
