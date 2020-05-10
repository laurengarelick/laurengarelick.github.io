const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamArray = [];
let teamCount = 0;

const questions = [
    {
        type: 'input',
        message: 'Enter your name',
        name: 'name'
    },
    {
        type: 'input',
        message: 'Enter your id',
        name: 'id'
    },
    {
        type: 'input',
        message: 'Enter your email',
        name: 'email',
        validate: validateEmail
    },
    {
        type: 'input',
        message: 'Enter your role',
        name: 'role'
    }
];

//this function will get all the info about the team
async function getTeam() {
    const prompt1 = await inquirer.prompt(questions)
    .then(async function (responses) {
    if(responses.role === "Manager" || responses.role === "manager") {
         const managerPrompt = await inquirer.prompt([
                {
                    type: 'number',
                    message: 'Enter your office number',
                    name: 'office'
                },
                {
                    type: 'number',
                    message: 'Enter the # of members on your team',
                    name: "members"
                }
    ]) .then(async function(obj) {
        const newManager= new Manager(responses.name,responses.id,responses.email,obj.office);
            teamArray.push(newManager);
            while(teamCount < obj.members) {
        const prompt2 = await inquirer.prompt(questions)
         .then(async function(res) {
             if(res.role === "Engineer" || res.role === "engineer") {
                await inquirer.prompt(
                         {
                         type: 'input',
                        message: 'Enter your github username',
                         name: 'github'
                         }
                 ) .then(function(resp) {
                        const newEngineer = new Engineer(res.name, res.id, res.email, resp.github);
                            teamArray.push(newEngineer);
                            teamCount++;
                })
            }
                    else if(res.role === "Intern" || res.role === "intern") {
                         const prompt3 = await inquirer.prompt(
                                {
                                    type: 'input',
                                    message: 'Enter your school',
                                    name: 'school'
                                }
                            ).then(function(r) {
                                const newIntern = new Intern(res.name, res.id, res.email, r.school);
                                teamArray.push(newIntern);
                                teamCount++;
                            })
                       }
                else {
                    console.log ("Invalid entry");
                }
              })      
            }
          })  
        }
       else {
        console.log("Must first enter manager info");
     }
    generatePage();
  })   
}

function validateEmail(email){
    let characters = "[a-zA-Z0-9]"+ "@"+"[a-zA-Z0-9]"+"."+"[a-zA-Z]";
    if (!email.match(characters)){
        return console.log("Invalid email. Please enter again");
    }
    else{
        return true;
    }
}

//creates team.html page
function generatePage() {
    if(!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    };
    let renderPage = render(teamArray);
    fs.writeFileSync(outputPath, renderPage);
};

getTeam();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
