var dotenv = require('dotenv').config({path: __dirname + '/.env'});
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');


module.exports = {
    mode: 'development',
    node: {
        // fs: 'empty',
        // net:'empty',
        //tls:'empty',
        //readline:'empty',
        
       // child_process:'empty',
      },
      target: 'node',
      plugins:[
         // new webpack.DefinePlugin({"process.env": dotenv.parsed})
        ]
}