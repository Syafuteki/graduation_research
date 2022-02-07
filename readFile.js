// 標準入力を取得する
process.stdin.resume();
process.stdin.setEncoding('utf8');
let fileName = "";

const reader = require('readline').createInterface({
    //入力を受け取る 
    input: process.stdin,
    output: process.stdout
});

reader.question('File Name? ', (answer) => {
    fileName = answer;
    read();
    reader.close();
});

//ファイル読み出し
function read() {
    const fs = require("fs");
    fs.readFile(fileName, "utf-8", (err, data) => {
        if (err) throw err;
        data = data.replace(/\r?\n/g, '\\n');
        console.log(data);
    });
}

