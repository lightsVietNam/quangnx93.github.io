/**
 * Created by quangprolathe on 06/02/2017.
 */
const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/quangprolathe/Desktop/Adele';
let arrayFlac = [];
const getFiles = (srcDir, currentDir) => {
    let files = fs.readdirSync(srcDir);
    //console.log(files)
    files.forEach((file) => {
        currentDir = srcDir + '/' + file
        if (fs.statSync(currentDir).isDirectory()) {
            getFiles(currentDir)
        } else {
            arrayFlac.push(currentDir)
        }
    })
}

getFiles(dir)

console.log(arrayFlac)