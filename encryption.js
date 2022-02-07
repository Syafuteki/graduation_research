// 標準入力を取得する
process.stdin.resume();
process.stdin.setEncoding('utf8');
let fileName = "";
let publicKey = '';
let plainText = "";


const reader = require('readline').createInterface({
    //入力を受け取る 
    input: process.stdin,
    output: process.stdout
});

//公開鍵を聞く
reader.question('File Name(public-key)? :', (answer) => {
    fileName = answer;

    //暗号化するUIDを入力
    reader.question('UID? :', (answer) => {
        plainText = answer;
        encryption();
        reader.close();
    });
});

//暗号化
function encryption() {
    const fs = require("fs");
    fs.readFile(fileName, "utf-8", (err, data) => {
        publicKey = data.toString();
        const crypto = require('crypto');
        const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(plainText));
        fs.writeFileSync('./key/encryptedUID.txt', encrypted.toString("base64"));
    });
}

