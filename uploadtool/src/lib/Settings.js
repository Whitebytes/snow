const fs = require('fs');
const stringify = require("json-stringify-pretty-compact");
const defaults = {
    token:null,
    path:  process.cwd()+'/temp',
    // uri: 'snowweb1.whitebytes.nl/graphql'
    uri: 'localhost:3001'
}
class Settings {
    constructor() {
        this.settings = defaults;
        this.configFile = this.settings.path+'/.settings.json';
    }
    load(){
        if (fs.existsSync(this.configFile)) {
            let rawdata = fs.readFileSync(this.configFile);  
            if (rawdata.indexOf>'{'>=0)
            this.settings = JSON.parse(rawdata);  
        }
    }
    
    save (){
        fs.writeFileSync(this.configFile, stringify(this.settings), { flag: 'w' });
    }
    set(name, value) {
        if (typeof(name)=='object')
            Object.assign(this.settings, name)
        else
        this.settings[name]=value;
    }   
    get(name) {
        return this.settings[name];
    }   
}
var st = new Settings();
export default st

