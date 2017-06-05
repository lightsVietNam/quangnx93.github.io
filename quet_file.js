/**
 * Created by quangprolathe on 06/05/2017.
 */
const fs = require('fs');
const path = require('path');
const convert = require('./convert')

//folderFlac đường dẫn file thư mục Fac

  exports.quet_file = class {
     constructor(folderFlac){
         this.folder = folderFlac
     }
     getFiles(srcDir, currentDir){
         currentDir = currentDir || []
         let files = fs.readdirSync(srcDir);
         //console.log(files)
         files.forEach((file) => {
             let name = srcDir + '/' + file
             if (fs.statSync(name).isDirectory()) {
                 this.getFiles(name,currentDir)
             } else {
                 currentDir.push(name)
             }

         })
         return currentDir;
     }

     //hàm kiểm tra phải là Flac hay ko
     checkFlac(file, extname) {
         return path.extname(file) === extname;
     }

     //Liệt kê danh sách hàm Flac
     addFlac(dir,check) {
         let allFiles = this.getFiles(dir);
         let flacFiles = [];
         allFiles.forEach(file => {
             if(check(file,'.flac')){
                 flacFiles.push({name: file, status: 'not convert'});
             }
         });
         return flacFiles;
     };

     listAllFlac (dir) {
         let arrFlac = this.addFlac(dir,this.checkFlac);
         return arrFlac;
     }

 }
 // const  scaner = new quetfile('C:/Users/quangprolathe/Desktop/Adele')
 // console.log(scaner.listAllFlac(scaner.folder))