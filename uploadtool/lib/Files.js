const fs = require('fs');
const path = require('path');

const files = {
  getCurrentDirectoryBase : () => {
    return path.basename(process.cwd());
  },

  directoryExists : (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },
  fileTree : (callback, base)=>{
    base =  base || process.cwd();
    console.log(base)
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
                result.push(file)
                if (file.isDirectory ){
                  files.fileTree(function(res){
                        file.files=res;
                        getStats(i+1, items)
                  }, base+'/' + file.name)
                }else{
                  getStats(i+1, items)
                }
              })
          }
          getStats(0, items);
      })
    }
};
module.exports = files;