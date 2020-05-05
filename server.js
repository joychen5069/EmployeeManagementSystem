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
    initial();
})

//prompt question about what the user wants to do
async function initial() {
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
        .then(function (answer) {
            console.log(answer.action)
            select(answer)
        })
}


//user function wants to view all employees
async function viewAll() {
    connection.query("SELECT * FROM employeeInfo", function (err, res) {
        if (err) throw err;

        console.table(res)

        initial();
    })
}

//user function wants to view all employees by department
async function viewDepartment() {
    //pull table to view all departments
    connection.query("SELECT * FROM employeeInfo", function (err, res) {
        if (err) throw err;
        //ask what department they want to view
        inquirer.prompt([
            {
                type: "list",
                name: "department",
                message: "What department would you like to view?",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].department);
                    }
                    return choiceArray;
                },

            }
        ])
            .then(function (answer) {
                connection.query(`SELECT * FROM employeeInfo WHERE department = "${answer.department}"`, function (err, res) {
                    if (err) throw err;

                    console.table(res)

                    initial();
                })
            })
    })
}

//user function wants to view all employees by manager
async function viewManager() {
    connection.query("SELECT * FROM employeeInfo", function (err, res) {
        if (err) throw err

        //ask what department they want to view
        inquirer.prompt([
            {
                type: "list",
                name: "manager",
                message: "Pick a manager to view the employees:",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].manager);
                    }
                    return choiceArray;
                },

            }
        ])
            .then(function (answer) {
                connection.query(`SELECT * FROM employeeInfo WHERE manager = "${answer.manager}"`, function (err, res) {
                    if (err) throw err;

                    console.table(res)

                    initial();
                })
            })
    })
}

//user function wants to ADD EMPLOYEE -- SUPER BROKEN FIX IT
function addEmployee() {
    //read the employees first
    connection.query("SELECT * FROM employeeInfo", function (err, res) {
        if (err) throw err;

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
                    "Add Role",
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
                    "Add Department",
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
                choices: function () {
                    var choiceArray = ["Add New Manager"];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].manager);
                    }
                    return choiceArray;
                },

            }
        ])

            .then(function (answer) {
                if (answer.manager === "Add New Manager") {
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "newManager",
                            message: "Who is the manager?"
                        }
                    ])
                        .then(function (results) {
                            connection.query(
                                "INSERT INTO employeeInfo SET ?",
                                {
                                    first_name: answer.first,
                                    last_name: answer.last,
                                    title: answer.role,
                                    department: answer.department,
                                    manager: results.newManager
                                },
                                function (err) {
                                    if (err) throw err;
                                    console.log("added successfully");
                                    // re-prompt
                                    initial();
                                }
                            )
                        })
                }
                else {
                    connection.query(
                        "INSERT INTO employeeInfo SET ?",
                        {
                            first_name: answer.first,
                            last_name: answer.last,
                            title: answer.role,
                            department: answer.department,
                            manager: answer.manager
                        },
                        function (err) {
                            if (err) throw err;
                            console.log("added successfully");
                            // re-prompt
                            initial();
                        }
                    )
                }

            })

    })
};

//user function wants to REMOVE EMPLOYEE
async function removeEmployee() {
    //read the employees first
    connection.query("SELECT * FROM employeeInfo", function (err, res) {
        if (err) throw err;

        //ask which employee they want to remove
        inquirer.prompt([
            {
                type: "list",
                name: "name",
                message: "Who would you like to remove?",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].first_name + " " + res[i].last_name);
                    }
                    return choiceArray;
                },
            }
        ])
            //now actually delete them
            .then(function (answer) {

                let fullName = answer.name
                console.log(fullName)
                let remove = fullName.split(" ")
                console.log(remove[0])

                connection.query(
                    `DELETE FROM employeeInfo WHERE first_name = "${remove[0]}" AND last_name = "${remove[1]}"`,

                    function (err) {
                        if (err) throw err;
                        console.log("removed successfully");
                        // re-prompt
                        initial();
                    }
                )
            })
    })

}

//user function wants to UPDATE Employee ROLE
async function updateRole() {
    //pull all the employees first
    connection.query("SELECT * FROM employeeInfo", function (err, res) {
        if (err) throw err

        //ask who they want to modify
        inquirer.prompt([
            {

                type: "list",
                name: "name",
                message: "Which employee would you like to update the role of?",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].first_name + " " + res[i].last_name);
                    }
                    return choiceArray;
                }
            },
            {
                type: "list",
                name: "role",
                message: "What would you like to update the role to be?",
                choices: function () {
                    var choiceArray = ["Add Role"];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].title);
                    }
                    return choiceArray;
                }

            }
        ])
            // now modify them
            .then(function (answer) {
                //split the name
                let fullName = answer.name;
                console.log(fullName);
                let splitName = fullName.split(" ");
                console.log(splitName[0]);

                if (answer.role === "Add Role") {
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "newRole",
                            message: "What is the new role?"
                        }
                    ])
                        .then(function (result) {
                            connection.query(
                                `UPDATE employeeInfo SET title = "${result.newRole}" WHERE first_name = "${splitName[0]}" AND last_name = "${splitName[1]}"`,
                                // [ {title: result.newRole}  ]   
                                function (err) {
                                    if (err) throw err;
                                    console.log("added successfully");
                                    // re-prompt
                                    initial();
                                }         
                            )
                        })

                }
                else {
                    connection.query(
                        `UPDATE employeeInfo SET title = "${answer.role}" WHERE first_name = "${splitName[0]}" and last_name = "${splitName[1]}"`,
                        // [ {title: answer.role}     ]
                        function (err) {
                            if (err) throw err;
                            console.log("added successfully");
                            // re-prompt
                            initial();
                        }
                    )
                }

                
            })
    })
}

//user function wants to UPDATE Employee MANAGER
async function updateManager() {
    //pull all the employees first
    connection.query("SELECT * FROM employeeInfo", function (err, res) {
        if (err) throw err

        //ask who they want to modify
        inquirer.prompt([
            {

                type: "list",
                name: "name",
                message: "Which employee would you like to update the manager of?",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].first_name + " " + res[i].last_name);
                    }
                    return choiceArray;
                }
            },
            {
                type: "list",
                name: "manager",
                message: "Who would you like to update the manager to be?",
                choices: function () {
                    var choiceArray = ["Add Manager"];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].manager);
                    }
                    return choiceArray;
                }

            }
        ])
            // now modify them
            .then(function (answer) {
                //split the name
                let fullName = answer.name;
                console.log(fullName);
                let splitName = fullName.split(" ");
                console.log(splitName[0]);

                if (answer.manager === "Add Manager") {
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "newManager",
                            message: "Who is the new manager?"
                        }
                    ])
                        .then(function (result) {
                            connection.query(
                                `UPDATE employeeInfo SET manager = "${result.newManager}" WHERE first_name = "${splitName[0]}" AND last_name = "${splitName[1]}"`,
                                  
                                function (err) {
                                    if (err) throw err;
                                    console.log("added successfully");
                                    // re-prompt
                                    initial();
                                }         
                            )
                        })

                }
                else {
                    connection.query(
                        `UPDATE employeeInfo SET manager = "${answer.manager}" WHERE first_name = "${splitName[0]}" and last_name = "${splitName[1]}"`,
                      
                        function (err) {
                            if (err) throw err;
                            console.log("added successfully");
                            // re-prompt
                            iniial();
                        }
                    )
                }

                
            })
    })
}


//run a switch statement to switch between them all
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
            updateRole();
            break;

        //Update Manager
        case ("Update Employee Manager"):
            console.log("Update Employee Manager");
            updateManager();
            break;

              default:
            //idk what you did but it broke the code
            console.log("Thank you for accessing the Database.");
            connection.end();
    }
}

module.exports = initial;