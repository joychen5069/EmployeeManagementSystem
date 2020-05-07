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
connection.connect((err) => {
    if (err) throw err;
    initial();
})

//prompt question about what the user wants to do
initial = async () => {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees by Manager",
                "View Department Table",
                "View Role Table",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role",
                "Update Employee Manager",
                "Remove Employee",
                "Finish"
            ]
        }
    ]);
    console.log(answer.action);
    select(answer);
}

//user function wants to view all employees-SUPER BROKEN FIX THIS
viewAll = async () => {
    connection.query(
        "SELECT * FROM employeeInfo LEFT JOIN roleInfo ON employeeInfo.title=roleInfo.title LEFT JOIN departmentInfo ON roleInfo.department_id=departmentInfo.id",
        (err, res) => {
            if (err) throw err;
            console.table(res)
            initial();
        })
}

//user function wants to view all employees by manager
viewEmpByMan = async () => {
    connection.query("SELECT * FROM roleInfo", 
    (err, res) => {
        if (err) throw err

        //ask what manager they want to view
        inquirer.prompt([
            {
                type: "list",
                name: "manager",
                message: "Pick a manager to view the employees:",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].manager);
                    }
                    return choiceArray;
                }
            }
        ])
            .then((answer) => {
                connection.query(`SELECT * FROM employeeInfo WHERE manager = "${answer.manager}"`,
                    (err, res) => {
                        if (err) throw err;

                        console.table(res)

                        initial();
                    })
            })
    })
}

//user function wants to ADD EMPLOYEE
addEmployee = () => {
    //read the employees first
    connection.query("SELECT * FROM roleInfo", async (err, res) => {
        if (err) throw err;

        //ask the key questions
        const answer = await inquirer.prompt([
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
                type: "list",
                name: "role",
                message: "What is the Employee's role?",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].title);
                    }
                    return choiceArray;
                }
            },
            {
                type: "list",
                name: "manager",
                message: "What is the manager's ID?",
                choices: [
                    0, 1, 2, 3, 4, 5
                ]
            }
        ]);
        connection.query("INSERT INTO employeeInfo SET ?", {
            first_name: answer.first,
            last_name: answer.last,
            title: answer.role,
            manager: answer.manager
        }, (err) => {
            if (err)
                throw err;
            console.log("added successfully");
            // re-prompt
            initial();
        });
    })
};

//user function wants to REMOVE EMPLOYEE
removeEmployee = () => {
    //read the employees first
    connection.query("SELECT * FROM employeeInfo", (err, res) => {
        if (err) throw err;

        //ask which employee they want to remove
        inquirer.prompt([
            {
                type: "list",
                name: "name",
                message: "Who would you like to remove?",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].first_name + " " + res[i].last_name);
                    }
                    return choiceArray;
                },
            }
        ])
            //now actually delete them
            .then((answer) => {

                let fullName = answer.name
                console.log(fullName)
                let remove = fullName.split(" ")
                console.log(remove[0])

                connection.query(
                    `DELETE FROM employeeInfo WHERE first_name = "${remove[0]}" AND last_name = "${remove[1]}"`,

                    (err) => {
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
updateRole = () => {
    //pull all the employees first
    connection.query("SELECT * FROM employeeInfo", (err, res) => {
        if (err) throw err

        //ask who they want to modify
        inquirer.prompt([
            {
                type: "list",
                name: "name",
                message: "Which employee would you like to update the role of?",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].first_name + " " + res[i].last_name);
                    }
                    return choiceArray;
                }
            },

            {
                type: "list",
                name: "role",
                message: "What would you like to update the role to be?",
                choices: () => {
                    let choiceArray = ["Add Role"];
                    for (let i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].title);
                    }
                    return choiceArray;
                }
            }
        ])
            // now modify them
            .then((answer) => {
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
                        .then((result) => {
                            connection.query(
                                `UPDATE employeeInfo SET title = "${result.newRole}" WHERE first_name = "${splitName[0]}" AND last_name = "${splitName[1]}"`,
                                // [ {title: result.newRole}  ]   
                                (err) => {
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
                        (err) => {
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
updateManager = () => {
    //pull all the employees first
    connection.query("SELECT * FROM employeeInfo", (err, res) => {
        if (err) throw err

        //ask who they want to modify
        inquirer.prompt([
            {
                type: "list",
                name: "name",
                message: "Which employee would you like to update the manager of?",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].first_name + " " + res[i].last_name);
                    }
                    return choiceArray;
                }
            },

            {
                type: "list",
                name: "manager",
                message: "What is the ID of the new manager?",
                choices: [
                    0, 1, 2, 3, 4, 5
                ]
            }
        ])
            // now modify them
            .then((answer) => {
                //split the name
                let fullName = answer.name;
                console.log(fullName);
                let splitName = fullName.split(" ");
                console.log(splitName[0]);

                connection.query(
                    `UPDATE employeeInfo SET manager = "${answer.manager}" WHERE first_name = "${splitName[0]}" and last_name = "${splitName[1]}"`,

                    (err) => {
                        if (err) throw err;
                        console.log("updated successfully");
                        // re-prompt
                        initial();
                    }
                )
            })
    })
}

//user function wants to view all departments
viewAllDepartment = () => {
    connection.query(
        "SELECT * FROM departmentInfo", (err, res) => {
            if (err) throw err;
            console.table(res);
            initial();
        }
    )
}

//user function wants to view all roles, salaries, etc
viewAllRoles = () => {
    connection.query(
        "SELECT * FROM roleInfo", (err, res) => {
            if (err) throw err;
            console.table(res);
            initial();
        }
    )
}

//user wants to add Department
addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "depName",
            message: "What is the name of the new department?"
        }
    ])
        .then(answer => {
            connection.query(
                `INSERT INTO departmentInfo SET department = "${answer.depName}"`,
                (err) => {
                    if (err) throw err;
                    console.log("added successfully");
                    // re-prompt
                    initial();
                }
            )
        })
}

//user wants to add a Role
addRole = () => {
    connection.query("SELECT * FROM departmentInfo", (err, res) => {
        if (err) throw err;

        inquirer.prompt([
            {
                type: "input",
                name: "roleTitle",
                message: "What is the name of the new role?"
            },

            {
                type: "input",
                name: "salary",
                message: "What is the starting salary of this position?"
            },

            {
                type: "input",
                name: "manager",
                message: "Who is the manager of this role? (if none, write None)"
            },

            {
                type: "list",
                name: "depID",
                message: "What is the department ID?",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].id)

                    }
                    return choiceArray
                }
            }
        ])
            .then(answers => {
                connection.query(
                    `INSERT INTO roleInfo SET ?`,
                    {
                        title: answers.roleTitle,
                        salary: answers.salary,
                        manager: answers.manager,
                        department_id: answers.depID
                    },
                    (err) => {
                        if (err) throw err;
                        // console.log(" successfully");
                        // re-prompt
                        initial();
                    }
                )
            })
    })
}


//run a switch statement to switch between them all
select = (answers) => {
    switch (answers.action) {

        //view ALL
        case ("View All Employees"):
            console.log("View All Employees");
            viewAll();
            break;

        //view Manager
        case ("View All Employees by Manager"):
            console.log("View All Employees by Manager");
            viewEmpByMan();
            break;


        //View Department
        case ("View Department Table"):
            console.log("View Department");
            viewAllDepartment();
            break;

        //View Role
        case ("View Role Table"):
            console.log("View Role");
            viewAllRoles();
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

        //Add Department
        case ("Add Department"):
            console.log("Adding department...")
            addDepartment();
            break;

        //Add Role
        case ("Add Role"):
            console.log("adding role...");
            addRole();
            break;

        default:
            //End connection
            console.log("Thank you for accessing the Database.");
            connection.end();
    }
}

// module.exports = initial;