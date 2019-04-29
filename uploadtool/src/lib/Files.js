const fs = require('fs');
const path = require('path');
import settings  from './Settings';
import { publish} from './MessageBus'
const files = {
  
  directoryExists : (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },

  fileTree : (callback, compare=[])=>{
    var base =  settings.get('path') + settings.get('uploadFolder');
    if (!fs.existsSync(base)){
        fs.mkdirSync(base);
    }
    var result = []
     fs.readdir(base, function(err, items) {
        var getStats = (i, items) =>{
          if (i==items.length)
            return callback(result);
          fs.stat(base +'/' +  items[i],
              function(err, stats){
                var file = {
                  name:items[i],
                  size : stats.size,
                  created: new Date(stats.ctime),
                  modified: new Date(stats.mtime),
                  isDirectory: stats.isDirectory()
                }
                
                var compareChilds=[];
                var compFile = compare.find(row=>{return row.name==file.name})
                if(compFile){
                  //known entry, keep old extra's
                  file ={...compFile, ...file}
                  compareChilds =compFile.files;
                }
                if (typeof(file.progress)!='undefined' && !file.id)
                  delete file.progress;
                  delete file.state
                  if( file.progress==0)
                    delete file.progress
                result.push(file)

                if (file.isDirectory ){
                  files.fileTree(function(res){
                        file.files=res;
                        getStats(i+1, items)
                  }, base+'/' + file.name, compareChilds)
                }else{
                  getStats(i+1, items)
                }
              })
          }
          getStats(0, items);
      })
    },
    publishFileList: ()=>{
      var fileList = JSON.stringify(settings.get('fileTree'))
      publish({
          topic:'fileList',
          payload:fileList
      }).catch((error) => {
            console.log(JSON.stringify(error))
      })
    }
};
let publishFileList = files.publishFileList;
export {files, publishFileList}