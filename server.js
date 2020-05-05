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
                "Update Employee Manager",
                "Finished"
            ]
        }
    ])
    .then(function(answer){
        console.log(answer.action)
        select(answer)
    })
}


//user function wants to view all employees
async function viewAll() {
    connection.query("SELECT * FROM employeeInfo", function(err,res){
        if(err) throw err;

        console.table(res)

        prompt();
    })
}

//user function wants to view all employees by department
async function viewDepartment() {
    //ask what department they want to view
    inquirer.prompt([
        {
            type: "list",
            name: "department",
            message: "What department would you like to view?",
            choices: [
                "Sales",
                "Finance",
                "Engineering",
                "Marketing"
            ]
                     
        }
    ])
    .then(function(answer){
        connection.query(`SELECT * FROM employeeInfo WHERE department = "${answer.department}"`, function(err,res){
            if(err) throw err;
    
            console.table(res)
    
            prompt();
        })
    })
}
    


//user function wants to view all employees by manager
async function viewManager() {
    connection.query("SELECT * FROM employeeInfo", function(err,res){
        if(err) throw err

    //ask what department they want to view
    inquirer.prompt([
        {
            type: "list",
            name: "manager",
            message: "Pick a manager to view the employees:",
               choices: function() {
                var choiceArray = [];
                for (var i = 0; i < res.length; i++) {
                  choiceArray.push(res[i].manager);
                }
                return choiceArray;
              },
                     
        }
    ])
    .then(function(answer){
        connection.query(`SELECT * FROM employeeInfo WHERE manager = "${answer.manager}"`, function(err,res){
            if(err) throw err;
    
            console.table(res)
    
            prompt();
        })
    })
})
}

//user function wants to ADD EMPLOYEE
function addEmployee() {
    //read the employees first
    connection.query("SELECT * FROM employeeInfo", function(err,res){
        if(err) throw err;

    //ask the key questions
     inquirer.prompt([
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
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: function() {
                var choiceArray = ["Add New Manager"];
                for (var i = 0; i < res.length; i++) {
                  choiceArray.push(res[i].manager);
                }
                return choiceArray;
              },

        }
    ])

    .then(function(answer){
        if (answer.manager === "Add New Manager") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "newManager",
                    message: "Who is the manager?"
                }
            ])
            .then(function(answer) {
                answer.manager = answer.newManager
            })     
        }
        
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
})

}

//user function wants to REMOVE EMPLOYEE
async function removeEmployee() {
    //read the employees first
    connection.query("SELECT * FROM employeeInfo", function(err,res){
        if(err) throw err;

    //ask which employee they want to remove
    inquirer.prompt([
        {
            type: "list",
            name: "remove",
            message: "Who would you like to remove?",
            choices: function() {
                var choiceArray = [];
                for (var i = 0; i < res.length; i++) {
                  choiceArray.push(res[i].first_name);
                }
                return choiceArray;
              },
        }
    ])
    //now actually delete them
    .then(function(answer) {
        connection.query(
            "DELETE FROM employeeInfo WHERE ?",
            {
                first_name: answer.remove
            },
            function(err) {
                if (err) throw err;
                console.log("removed successfully");
                // re-prompt
                prompt();
              }
        )
    })
})
    
}

//user function wants to UPDATE Employee ROLE

//user function wants to UPDATE Employee MANAGER

//user function to end
async function end() {
    connection.end();
}

//idk probably run a switch statement to switch between them all
async function select(answers) {
    switch (answers.action) {

        //view ALL
        case ("View All Employees"):
            console.log("View All Employees");
            viewAll();
            break;

        //view Department
        case ("View All Employees by Department"):
            console.log("View All Employees by Department");
            viewDepartment();
            break;

        //view Manager
        case ("View All Employees by Manager"):
            console.log("View All Employees by Manager");
            viewManager();
            break;

        //Add employee
        case ("Add Employee"):
            console.log("Add Employee");
            addEmployee();
            break;

        //Remove employee
        case ("Remove Employee"):
            console.log("Remove Employee");
            removeEmployee();
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
            console.log("Thank you for accessing the Database.");
            end();
        }
}

//actually run the thing
// prompt()
//     .then(function (answers) {
//         select(answers);
//     })
