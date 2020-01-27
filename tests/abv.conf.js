const fs = require('fs');
const path = require('path');

function findInDir(dir, filter, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const fileStat = fs.lstatSync(filePath);

        if (fileStat.isDirectory()) {
            findInDir(filePath, filter, fileList);
        } else if (filter.test(filePath)) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

var header = "const abv = require('../../build/output/sog-validator');\nconst engine = new abv.Application({language: 'en'});\nconst chalk = require('chalk');";

fs.writeFile('./build/all.js', header, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;
} );

const generateString = function (string, length = 10, position) {
    let generatedString = "";

    if (
        "end" === position
        && false === Number.isInteger(length)
    ) {
        length --;
    }

    for (let i = 0; i < length; i++) {
        generatedString += string;
    }

    return generatedString;
}

let files = findInDir('./', /-test.js$/);
files.forEach(function (path) {
    fs.readFile(path, function (err, data) {
        if (err) callback(err);

        let length = (70 - (path.length + 2)) / 2;

        let validatiorHeader = "";
        validatiorHeader += "\n\n\n/**\n";
        validatiorHeader += " * ======================================================================\n";
        validatiorHeader += " * " + generateString('=', length, 'start') + " " + path + " " + generateString('=', length, 'end') + "\n";
        validatiorHeader += " * ======================================================================\n";
        validatiorHeader += " */\n";

        fs.appendFile('./build/all.js', validatiorHeader + data.toString(), (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;
        });
    });
});