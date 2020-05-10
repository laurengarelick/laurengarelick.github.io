const Employee = require("Employee.js")

class Engineer extends Employee {
    constructor(name,id,email,github){
        super(name,id,email,)
        this.github = github
    }
    getSchool() {
        return this.github
    }
    getRole() {
        return "Engineer"
    }
}
file.exports = Engineer