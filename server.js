const inquirer = require("inquirer");

//prompt question about what the user wants to do
async function prompt() {
    return inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager"
            ]
        }
    ])
    }


//user function wants to view all employees

//user function wants to view all employees by department

//user function wants to view all employees by manager

//user function wants to ADD EMPLOYEE

//user function wants to REMOVE EMPLOYEE

//user function wants to UPDATE Employee ROLE

//user function wants to UPDATE Employee MANAGER

//idk probably run a switch statement to switch between them all
async function select(answers) {
    switch (answers.action) {

        //view ALL
        case ("View All Employees"):
            console.log("View All Employees");

            break;

        //view Department
        case ("View All Employees by Department"):
            console.log("View All Employees by Department");

            break;

        //view Manager
        case ("View All Employees by Manager"):
            console.log("View All Employees by Manager");

            break;

        //Add employee
        case ("Add Employee"):
            confirm.log("Add Employee");

            break;

        //Remove employee
        case ("Remove Employee"):
            confirm.log("Remove Employee");

            break;

        //Update Role
        case ("Update Employee Role"):
            confirm.log("Update Employee Role");

            break;

        //Update Manager
        case ("Update Employee Manager"):
            confirm.log("Update Employee Manager");

            break;

        //Add employee
        case ("Add Employee"):
            confirm.log("Add Employee");

            break;

        default:
            //idk what you did but it broke the code
            console.log("Your team.html has been written")
            write();
            break;
    }
}

//actually run the thing
prompt()
    .then(function(answers) {
        select(answers);
    })
