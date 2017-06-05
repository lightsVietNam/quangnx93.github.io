/**
 * Created by quangprolathe on 06/02/2017.
 */
const fs = require('fs');
const path = require('path');

/***
 *
 * @param dir
 * @param dalam: dalam là hàm call back có 2 tham số truyền vào là err và result.
 */

const checkFile = (file,extname) => {
    return (path.extname(file) === extname);
};

const walk = (dir, dalam) => {
    let results = [];

    fs.readdir(dir, (err, list) => {
        if (err) return dalam(err);
        let pending = list.length;
        if (!pending) return done(null, results);

        list.forEach( (file) => {

           file = path.resolve(dir, file); // Thêm các trình tự của đường dẫn hoặc đường dẫn các phân đoạn vào một đường dẫn tuyệt đối
            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) { //Kiểm tra trước hết nếu stat thực sự là một oject
                    walk(file, (err, res) => { //neu la thu vien chay ham walk() lan nua de doc file bên trong nó
                        results = results.concat(res);
                        if (!--pending) dalam(null, results);
                    });
                } else {
                    //kiểm tra file có thỏa mãn yêu cầu tìm kiếm hay không thì mới add vào results.
                    if(checkFile(file,'.flac')){
                        results.push(file);
                    }
                    //results.push(file);
                    if (!--pending) dalam(null, results);
                }
            });
        });
    });
};

walk('C:/Users/quangprolathe/Desktop/Adele', (error, file) => {
    console.log('Có tất cả '+file.length+' file flac');
    console.log(file);
});