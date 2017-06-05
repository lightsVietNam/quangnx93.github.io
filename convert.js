/**
 * Created by quangprolathe on 06/05/2017.
 */
const spawn = require('child_process').spawn;
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
//const quet_file = require('./quet_file')

 exports.convert = class {
     constructor(nguonFolder,huyFolder){
         this.nguonFolder = nguonFolder;
         this.huyFolder = huyFolder;
     }

     //
     convert(input,output){
         return new Promise((resolve,reject) => {
             let notpath = output.replace("/" + path.basename(output),''); // ten file khong co đường dẫn
             shell.mkdir('-p',notpath);  // tao day du đường dẫn
             const convert = spawn('ffmpeg', ['-n', '-i', input, '-ab', '320k', '-map_metadata', '0', '-id3v2_version', '3', output]);
             convert.on('close', (code) => {
                 if (code === 0) {
                     resolve(input)
                 } else {
                     reject(`File ${input} caught error`);
                 }
             });
         });
     }
 }
