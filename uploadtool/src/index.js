
import login  from './lib/Login';
import settings  from './lib/Settings';
import client  from './lib/Subscriptions';
import gql from "graphql-tag";
import {dispatch, subscribe} from './lib/MessageBus'
import {uploadFiles} from './lib/FileUploader'
import{ files } from './lib/Files'
const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');

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
   },  settings.get('root'), settings.get('fileTree'))
   
   //handle any filelist-request
  subscribe(null, 'requestFileList', (message)=>files.publishFileList(message.sender))
  subscribe(null, 'requestFileUpload', (message)=>  uploadFiles(message))
    
    
    //online 
    files.publishFileList()
 }
  
run();