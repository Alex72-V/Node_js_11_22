const fs = require('fs');
const readline = require('readline');

const readStream = fs.createReadStream('./access_tmp.log', { encoding: 'utf-8'});
const ip1 = '89.123.1.41';
const ip2 = '34.48.240.111';

const writeStream1 = fs.createWriteStream(`${ip1}`);
const writeStream2 = fs.createWriteStream(`${ip2}`);

let strimNum = 0;

const rl = readline.createInterface({
    input: readStream
});

rl.on('line', (line) => {
    if(line.includes(ip1)) {
        writeStream1.write(line + '\n');
    }
    if(line.includes(ip2)) {
        writeStream2.write(line + '\n');
    }

    console.log(++strimNum)
});