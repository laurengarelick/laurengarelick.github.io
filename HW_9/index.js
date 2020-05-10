const util = require('util');
const {prompt} = require('inquirer');
const fs = require('fs');
const axios = require('axios')

const questions = [
    {
        message: "What is your github username?",
        name: "github",
        default: "laurengarelick"
    },
    {
    message: "What is the title of your project?",
    name: 'title',
    default: "The Best Project Ever"
},
{
    message: "Describe your project",
    name: 'description',
    default: "This project does lots of cool things."
},
{
    type: 'checkbox',
    message: "What would you like to include in your table of contents?",
    name: 'toc',
    choices: ['Installation', 'Usage', 'Contributing', 'License'],
    default: ['Installation', 'Usage', 'Contributing', 'License']
    
},
{
    message: "What are the steps required to install your project?",
    name: 'install',
    default: 'No installation required.'
},
{
    message: "Please provide instructions and examples for use.",
    name: 'usage',
    default: 'npm run start'
},
{
    message: "Please list the GitHub usernames of all those who contributed to this project.",
    name: 'gitHubEmail',
    default: 'laurengarelick@gmail.com'
},
{
    message: "Include a license?",
    type: 'list',
    name: 'license',
    choices: ['MIT', 'Apache', 'GNU', 'None'],
    default: 'MIT'
},
{
    message: "Would you like to add any additional badges to this project? If so, please list the URLs seperated by a comma to any badges.",
    name: 'badge',
    default: 'https://img.shields.io/redmine/plugin/stars/laurengarelick.io?color=purple&logo=purple'
},
{
    message: "Are there any tests you'd like to include with this project?",
    name: 'test',
    default: "npm run test"
}];
 
async function init(){
    const response = await prompt(questions);
    console.log(questions.response);
    const githubData = await getGithub(response.github)
    console.log('github api', githubData.data)
    writeMD({...response, ...githubData.data})


async function writeMD (data){
const badge = data.license === "Apache" ? "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)" :
data.license === "GNU" ? "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)" :
data.license === "MIT" ? "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)" :
"[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)"
const template = 
`# ${data.title}
${badge}
## Description

${data.description}

## Table of Contents

${data.toc.map(a=> `* [${a}](#${a})\n`).join('')}
## Installation

${data.install}

## Usage

${data.usage}

## License

This Application is Licensed with the ${data.license} license. Don't get any ideas.

## Contributing

## Tests

To test, use the ${data.test} command

## Questions

If you have any questions about the repo, open an issue or contact [${data.github}](${data.url}) directly at ${data.gitHubEmail}.

`
   await fs.writeFile(`${data.title}.md`, template, (err)=> console.log(err ||'yay file created!' ));
}

//initialize function;
init()

function getGithub(username){

const github_query = `https://api.github.com/users/${username}`;
    return axios.get(github_query);
}

    


function createBadge(type, title) {
return `https://img.shields.io/badge/${type}-${title}-blue`;
}

function getEmailAddress(github_userdata) {

for (let i = 0; i < github_userdata.data.length; i++) {

    if (github_userdata.data[i].payload.hasOwnProperty("commits")) {
        available = true;
        const gitHubEmail = github_userdata.data[i].payload.commits[0].author.email;
        return gitHubEmail;
    }

}
return "User profile email is unavailable";
}

function getProfileImage(github_userdata) {

for (let i = 0; i < github_userdata.data.length; i++) {

    if (github_userdata.data[i].actor.hasOwnProperty("avatar_url")) { 
        const gitHubProfileImage = github_userdata.data[i].actor.avatar_url;
        return gitHubProfileImage;
    }
}
return "User profile image unavailable";
}}
