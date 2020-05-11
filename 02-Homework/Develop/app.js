const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const {prompt} = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamArray = [];

const empMaker = {
    Manager,
    Intern,
    Engineer
}

function makePrompt(role){
    const questions = [
        {
            message: `Enter the ${role}'s name`,
            name: 'name'
        },
        {
            message: `Enter the ${role}'s id`,
            name: 'id'
        },
        {
            message: `Enter the ${role}'s email`,
            name: 'email',
        }
    ];
    const extra = role === "Manager" ? [{
        message: "Enter the Manager's Office Number",
        name: 'extra'
    }] : role === "Engineer" ? [{
        message: "Enter the Engineer's Github username",
        name: 'extra'
    }] : [{
        message: "Enter the Intern's School",
        name: 'extra'
    }]
    return questions.concat(extra)
}

async function menu(){
    const {choice} = await prompt({
        message: "Choose a role to add to the roster.",
        type: "list",
        name: "choice",
        choices: ["Manager", "Engineer", "Intern", "I don't want to add anymore."]
    })
   if(choice == "I don't want to add anymore."){
    makeTeam()
   }else{
    const newPrompt = makePrompt(choice);
    const {name, id, email, extra} = await prompt(newPrompt);
    const newEmp = new empMaker[choice](name,id,email,extra);
    teamArray.push(newEmp);
    console.log('new employee added!')
    setTimeout(menu, 1000)
   }
}

function makeTeam(){
    fs.writeFile(outputPath, render(teamArray), (err)=>console.log(err || 'Success!'))
}

menu()



