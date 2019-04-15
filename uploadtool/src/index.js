
import login  from './lib/Login';
import settings  from './lib/Settings';
import client  from './lib/Subscriptions';
import gql from "graphql-tag";
import {dispatch, subscribe} from './lib/MessageBus'
import {uploadFiles} from './lib/FileUploader'
import{ files } from './lib/Files'
const chalk       = require('chalk');
const clear       = require('clear');
const fetch = require('node-fetch');
const fs = require('fs');

clear();
console.log(
  chalk.green(
    //figlet.textSync('Green Pix CLI', { horizontalLayout: 'full' })
  )
); 

const run = async () => {
  settings.load()
    await login().then((user)=>{
      console.log(`Welcome back ${user.firstName}!`)
       client.subscribe({
        query: gql`subscription{actionRequest{type, payload, sender, userId, origin, id	}}`,
        variables: {}
      }).subscribe({
        next ({data}) {
          if (data.actionRequest){
            dispatch(data.actionRequest);
          }
        },
        error(err) { console.error('err', err); },
      });
    });
    settings.set('root',  process.cwd()+'/temp'); 
    
    files.fileTree(function (res) {
      settings.set('fileTree',res);
      settings.save();
   },  settings.get('fileTree'))
   
  //handle any filelist-request
  subscribe(null, 'requestFileList', (message)=>files.publishFileList(message.sender))
  subscribe(null, 'requestFileUpload', (message)=>  uploadFiles(message))

  //online 
  files.publishFileList()


  let downloadFile = async (url, outputPath) =>{
    const res = await fetch(url);
    await new Promise((resolve, reject) => {
      const fileStream = fs.createWriteStream(outputPath);
      res.body.pipe(fileStream);
      res.body.on("error", (err) => {
        reject(err);
      });
      fileStream.on("finish", function() {
        resolve();
      });
    });

  }
  

  for(var i=0; i<100;i++){
    downloadFile(
      'https://picsum.photos/5000/5000/?random',
      settings.get('path')+settings.get('uploadFolder') +'/file'+i+'.jpg' 
    )
  }
}
run();