const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
import resolvers from '../data/resolvers';

var config    = require(__dirname + '/../config/config.js')[env];
const db = {};
db['resolvers']  = resolvers
db['schemas']  =''
db['queries']  =''

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

  function assign(target, source) { //as Object.assign, but recursive
    for(var i in source) {
        if(target[i] != null &&  typeof(target[i])=="object"){
          target[i] = assign(target[i], source[i]);
        }
        else
          target[i] = source[i];
    }
    return target;
}
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
  if (db[modelName].resolvers){
    let resolve = (typeof(db[modelName].resolvers)=='function') ?
      db[modelName].resolvers(db) : db[modelName].resolvers;
    assign(db['resolvers'],resolve)
  }
  if (db[modelName].gqlType){
    db['schemas']+='\n'+ db[modelName].gqlType;
  }
  if (db[modelName].gqlQuery){
    db['queries']+='\n'+ db[modelName].gqlQuery;
  }
});
console.log('modules loaded');
const seed = async (db)=>{
  var dirName =__dirname+'/../util/seeds';
  var seedResult={};
  var files =await fs
  .readdirSync(dirName)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  }).sort();
 
  for (var idx in files){
    const seeder = require(path.join(dirName, files[idx])).default;
    seedResult = await seeder.apply(db, seedResult);
  }
  
}

db.sequelize = sequelize; 
db.Sequelize = Sequelize;  
db.sequelize.sync({force: true}).
  then(()=>{
    seed(db)
  }
  )

/*  for (var n in sequelize.models){
    var attr =sequelize.models[n].rawAttributes;
    for (var m in attr){
      console.log(attr[m].type.constructor.name)
    }
  }
*/
module.exports= db;