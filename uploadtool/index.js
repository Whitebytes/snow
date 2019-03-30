const fs = require('fs');
const path = require('path');
import login  from './lib/Login';
import settings  from './lib/Settings';
import client  from './lib/Subscriptions';

const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const files      = require('./lib/Files');

clear();
console.log(
  chalk.green(
    figlet.textSync('Green Pix CLI', { horizontalLayout: 'full' })
  )
); 

const run = async () => {
  settings.load()
    await login().then((user)=>{
      console.log(`Welcome back ${user.firstName}!`)
    });

    
    var rootDir =  process.cwd()+'/temp';
  //  files.fileTree(function (res) {
  //    console.log('asd',JSON.stringify(res));
  //  }, rootDir);
 }
  
run();