/**
 * Created by quangprolathe on 06/05/2017.
 */
const convert = require("./convert").convert;
const quet_file = require("./quet_file");
const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');


// renderFile = (arrFlac,arrMp3,convert)=>{
//     arrFlac.forEach((file,index)=>{
//         if(count < 4 && file.status === 'not convert'){
//             count++;
//             file.status ='done';
//             convert.flacToMp3(file.name,arrMp3[index]).then(()=>{
//                 count--;
//                 done++;
//
//                 renderFile(arrFlac,arrMp3,convert);
//
//             }).catch((err) => {
//                 count--;
//                 writer.write(err + '\n');
//                 renderFile(arrFlac,arrMp3,convert);
//             });
//         }
//     });
// };


const mp3Path = (pathFlac,convert) => {
    let arrMp3 = [];
    pathFlac.forEach(file => {
        let filename = file.name;
        let desname = filename.replace(convert.nguonFolder,convert.huyFolder);
        let temp = desname.replace('.flac', '.mp3');
        arrMp3.push(temp);
    });
    return arrMp3;
};

const getArrFlac = (srcFolder) => {
    const myScanner = new quet_file.quet_file(srcFolder);
    return myScanner.listAllFlac(myScanner.srcFolder);

};

const runner2 = (srcFolder, desFolder, getArrFlac) =>{
    const myConvert = new convert(srcFolder,desFolder);
    fileArrFlac = getArrFlac(srcFolder);
    const fileArrMp3 = mp3Path(fileArrFlac,myConvert);
    //renderFile(fileArrFlac,fileArrMp3,myConvert);
};
//console.time("convert");

runner2('C:/Users/quangprolathe/Desktop/Adele', 'C:/Users/quangprolathe/Desktop/converted', getArrFlac);