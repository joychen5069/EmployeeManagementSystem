const mysql = require("mysql")
const inquirer = require("inquirer");

//creat connection for sql database

const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "joychen5069",
    database: "employee_db"


});

//connect to mysql server and sql database 
connection.connect(function (err) {
    if (err) throw err;

    prompt();
})

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
    .then(function(answer){
        console.log(answer.action)
        select(answer)
    })
}


//user function wants to view all employees

//user function wants to view all employees by department

//user function wants to view all employees by manager

//user function wants to ADD EMPLOYEE
async function addEmployee() {
    //ask the key questions
    await inquirer.prompt([
        {
            type: "input",
            name: "first",
            message: "What is the Employee's first name?"

        },

        {
            type: "input",
            name: "last",
            message: "What is the Employee's last name?"

        },

        {
            type: "input",
            name: "first",
            message: "What is the Employee's first name?"

        },

        {
            type: "list",
            name: "role",
            message: "What is the Employee's role?",
            choices: [
                "Sales Lead",
                "Sales Person",
                "Lead Engineer",
                "Account Manager",
                "Accountant",
                "Legal Team Lead",
                "Lawyer"
            ]

        },

        {
            type: "list",
            name: "department",
            message: "What is the Employee's department?",
            choices: [
                "Sales",
                "Engineering",
                "Finance",
                "Legal",
            ]

        },

        {
            type: "input",
            name: "manager",
            message: "Who is the employee's manager?"

        }
    ])
    .then(function(answer){
        connection.query(
            "INSERT INTO employeeInfo SET ?",
            {
                first_name: answer.first,
                last_name: answer.last,
                title: answer.role,
                department: answer.department,
                manager: answer.manager
            },
            function(err) {
                if (err) throw err;
                console.log("added successfully");
                // re-prompt
                prompt();
              }
        )
    })


}

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
            console.log("Add Employee");
            addEmployee();
            break;

        //Remove employee
        case ("Remove Employee"):
            console.log("Remove Employee");

            break;

        //Update Role
        case ("Update Employee Role"):
            console.log("Update Employee Role");

            break;

        //Update Manager
        case ("Update Employee Manager"):
            console.log("Update Employee Manager");

            break;

        //Add employee
        case ("Add Employee"):
            console.log("Add Employee");

            break;

        default:
            //idk what you did but it broke the code
            console.log("Your team.html has been written")
            break;
    }
}

//actually run the thing
// prompt()
//     .then(function (answers) {
//         select(answers);
//     })
