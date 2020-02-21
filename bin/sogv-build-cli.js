#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const inquirer = require('inquirer');
const fs = require('fs');
const sogh = require("sog-helper");
const sogv = require("../build/output/sog-validator");

let __ClassName, __FileName;

const types = [
    'validator'
];

const options = yargs
    .usage("Usage: -t <type>")
    .option("t", { alias: "type", describe: "Type of object.", type: "string", demandOption: true })
    .usage("Usage: -n <name>")
    .option("n", { alias: "name", describe: "Name of object.", type: "string", demandOption: true })
    .usage("Usage: -p <path>")
    .option("p", { alias: "path", describe: "Path to the new object.", type: "string", demandOption: true })
    .argv;

let showMsgBox = (message) => {
    const msgBox = boxen(chalk.white.bold(message), {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "green",
        backgroundColor: "#555555"
    });

    console.log(msgBox);
};

let builders = {
    'validator': function () {
        let questions = [
            {
                type: "input",
                name: "ClassName",
                default: __ClassName,
                validate: function (data) {
                    let message = sogv.isValidWithErrorMessage(data, 'required|string|length:10,255');
                    return (null === message) ? true : message;
                },
                message: "Class Name: "
            },
            {
                type: "input",
                name: "FileName",
                default: __FileName,
                validate: function (data) {
                    let message = sogv.isValidWithErrorMessage(data, 'required|string|length:5,255');
                    return (null === message) ? true : message;
                },
                message: "File Name: "
            },
            {
                type: "input",
                name: "ClassDescription",
                // default: "The field under validation must be valid.",
                validate: function (data) {
                    let message = sogv.isValidWithErrorMessage(data, 'required|string|length:10,255');
                    return (null === message) ? true : message;
                },
                message: "Description: "
            },
            {
                type: "input",
                name: "Alias",
                // default: "checking",
                validate: function (data) {
                    let message = sogv.isValidWithErrorMessage(data, 'required|string|alpha|length:2,20');
                    return (null === message) ? true : message;
                },
                message: "Alias: "
            },
            {
                type : "input",
                name : "ErrorMessage",
                // default: "This value should be valid.",
                validate: function (data) {
                    let message = sogv.isValidWithErrorMessage(data, 'required|string|length:10,255');
                    return (null === message) ? true : message;
                },
                message : "Error Message: "
            }
        ];

        let content = fs.readFileSync('./tmpl/validator.js.tmpl', 'utf8');
        inquirer.prompt(questions).then(function (answers) {
            for (var key in answers) {
                if (!answers.hasOwnProperty(key)) continue;

                content = content.replace(new RegExp(`%${key}%`,"gm"), answers[key]);
            }

            __FileName = answers.FileName;

            fs.writeFile(options.path + "/" + __FileName + '.js', content, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
        });
    }
};

try {
    if (false === types.includes(options.type)) {
        throw Error('Invalid specified object type: "' + options.type + '". Available types: ' + types.join(', '));
    }

    if (false === fs.existsSync(options.path)) {
        throw Error('Invalid path: ' + options.path);
    }

    __ClassName = sogh.camelCase(options.name + '_' + options.type);

    __FileName = sogh.sluggable(options.name + '_' + options.type);

    showMsgBox(`Generate new ${options.type}: ${__ClassName}.`);

    builders[options.type]();

} catch (error) {
    const PrettyError = require('pretty-error');
    let pe = new PrettyError();

    console.log(pe.render(error));
}