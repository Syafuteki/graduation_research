// 標準入力を取得する
process.stdin.resume();
process.stdin.setEncoding('utf8');
let fileName_1 = "";
let fileName_2 = "";
let privateKey = '';

const reader = require('readline').createInterface({
    //入力を受け取る 
    input: process.stdin,
    output: process.stdout
});

//秘密鍵を聞く
reader.question('File Name(private-key)? :', (answer) => {
    fileName_1 = answer;

    //暗号化されたUIDを開く
    reader.question('FileName(encryptedUID)? :', (answer) => {
        fileName_2 = answer;
        decryption();
        reader.close();
    });
});

//復号
function decryption() {
    const fs = require("fs");
    //秘密鍵の読み出し
    fs.readFile(fileName_1, "utf-8", (err, data) => {
        privateKey = data.toString();
    });
    //暗号化された文の読み出し
    fs.readFile(fileName_2, "utf-8", (err, data) => {
        secretText = data.toString();
        const crypto = require('crypto');
        const decrypted = crypto.privateDecrypt(privateKey, Buffer.from(secretText, 'base64'));
        console.log(decrypted.toString("utf-8"));
    });
    return 0;
}

