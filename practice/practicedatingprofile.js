const {prompt} = require('inquirer');
const fs = require('fs')
const questions = [{
    message: "What is your name?",
    name: 'name',
    default: "Lauren"
},
{
    message: "What is your gender?",
    name: 'gender',
    default: "None of your business"
},
{
    message: "What is your gender preference?",
    name: 'gendpref',
    default: "Anything that breaths"
},
{
    message: "What is your age?",
    name: 'age',
    default: "18"
},
{
    message: "What is your age preference?",
    name: 'agepref',
    default: "18-100"
},
{
    message: "What is your height?",
    name: 'height',
    default: "5'6"
},
{
    type: 'list',
    message: "What is your relationship goal?",
    name: 'goal',
    choices: ['quick fling', 'short term rebound', 'long and meaningful'],
    default: "short term rebound"
},
{
    type: 'checkbox',
    message: "What is your preferred ethinicity?",
    name: 'ethnicity',
    choices: ['red', 'yellow', 'green', 'blue', 'purple'],
    default: ["purple"]
}]


async function init(){
    const answers = await prompt(questions);
    const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <title>${answers.name}'s Dating Profile</title>
</head>
<body>
    <div class="jumbotron" style='height:20vh'><h1>Hi!My name is Lauren!</h1></div>
    <div class="card" style="width: 18rem;">
        <img src="https://pbs.twimg.com/profile_images/1041587930622517248/KcngbToI_400x400.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">I'm a ${answers.gender} looking for ${answers.gendpref} for a ${answers.goal}</h5>
          <p class="card-text">Here's a bit about me - I'm ${answers.height}, ${answers.age} years old, I prefer ages between ${answers.agepref}, only ${answers.ethnicity} allowed.</p>
        </div>
      </div>
</body>
</html>
    `
    fs.writeFile(`${answers.name}Profile.html`, template, (err)=>console.log('success!'))
}

init()