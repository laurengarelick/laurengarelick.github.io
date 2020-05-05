
const util = require('util');
const {prompt} = require('inquirer');
const fs = require('fs');



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


const answers = prompt.inquirer({
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
    choices: ['Installation', 'Useage', 'Credits', 'License '],
    default: [""]
    
},
{
    message: "What are the steps required to install your project?",
    name: 'install',
    default: 'No installation required.'
},
{
    message: "Please provide instructions and examples for use.",
    name: 'usage',
    default: ''
},
{
    message: "Please list the GitHub usernames of all those who contributed to this project.",
    name: 'gitHubEmail',
    default: 'laurengarelick@gmail.com'
},
{
    message: "License?",
    name: 'license',
    default: 'MIT'
},
{
    message: "Would you like to add any badges to this project? If so, please list the URLs seperated by a comma to any badges.",
    name: 'badge',
    default: 'https://img.shields.io/redmine/plugin/stars/laurengarelick.io?color=purple&logo=purple'
},
{
    
    message: "Are there any tests you'd like to include with this project?",
    name: 'test',
    default: "No tests at this time."
});
 

// async function init(){
//     const answers = await prompt(questions);
//     const template = `<!DOCTYPE md>

//     `
//     fs.writeFile(`${answers.name}Profile.html`, template, (err)=>console.log('success!'))
// }
// init()
//use prompt to gather some info...
async function init(){
    const response = await prompt(questions);
    console.log(questions.response);
    writeHTML(response)
}
async function writeHTML (data){
const template = 
`# ${data.title}

## Description

${data.description}

## Table of Contents

## Installation

## Usage

${data.usage}

## License

## Contributing

## Tests`
   await fs.writeFile(`${data.name}.md`, template);
   console.log('yay file created!')
}
init()

if (github_username !== "") {

    const github_query = `https://api.github.com/users/${github_username}/events/public`;

    axios.get(github_query).then(function(github_userdata) {

    //user email address:
    const gitHubEmail = getEmailAddress(github_userdata);
    console.log(`User's Email address: ${gitHubEmail}`);

    //user profile image:
    const gitHubProfileImage = getProfileImage(github_userdata);
    console.log(`User's Profile Image: ${gitHubProfileImage}`);

    });

};

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

}
