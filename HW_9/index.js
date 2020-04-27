
const util = require('util');
const {prompt} = require('inquirer');
const fs = require('fs');

https://img.shields.io/redmine/plugin/stars/laurengarelick.io?color=purple&logo=purple
// * At least one badge
// * Project title
// * Description
// * Table of Contents
// * Installation
// * Usage
// * License
// * Contributing
// * Tests
// * Questions
// * User GitHub profile picture
// * User GitHub email

fs.writeFile = util.promisify(fs.writeFile);
const questions = [
    {
        message: "What is your name?",
        name: 'name',
        default: 'chad'
    },
    {
        message: "What is your location?",
        name: 'location',
        default: 'home'
    },
    {
        message: "Tell me a bit about yourself",
        name: 'bio',
        default: 'im cool'
    },
    {
        message: "What is your linkedin url?",
        name: 'linkedin',
        default: 'coolguy.linkedin'
    },
    {
        message: "What do you like to eat for lunch?",
        name: 'lunch',
        default: 'meat'
    },
    {
        message: "What is your birthday?",
        name: 'bday',
        default: 'null'
    },
]
//use prompt to gather some info...
async function init(){
    const response = await prompt(questions);
    console.log(response);
    writeHTML(response)
}
async function writeHTML(data){
const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>hello ${data.name}!</h1>
    <h2>you live at ${data.location}</h2>
    <h2>about you - ${data.bio}</h2>
    <h2>linkedin - ${data.linkedin}</h2>
    <h2>having ${data.lunch} for lunch</h2>
    <h2>birthday is on ${data.bday}</h2>
</body>
</html>`
   await fs.writeFile(`${data.name}.html`, template);
   console.log('yay file created!')
}
init()