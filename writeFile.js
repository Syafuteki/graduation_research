// 標準入力を取得する
process.stdin.resume();
process.stdin.setEncoding('utf8');
let fileName = "";
let text = "";


const reader = require('readline').createInterface({
    //入力を受け取る 
    input: process.stdin,
    output: process.stdout
});

//公開鍵を聞く
reader.question('File Name? :', (answer) => {
    fileName = answer;

    //暗号化するUIDを入力
    reader.question('sentence? :', (answer) => {
        text = answer.replace(/\\n/g, '\n');
        write();
        reader.close();
    });
});

//暗号化
function write() {
    const fs = require("fs");
    fs.writeFileSync(fileName, text, { encoding: "utf8" });
}

