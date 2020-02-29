const inquirer = require("inquirer");
const connection = require("./connection/connection");

// Default function that asks user for command
const restart = () => {
inquirer
.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "action",
    choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Department', 'Add Role', 'Add employee', 'Update Employee Role']
    }
]).then(result => {
    let action = result.action;
    console.log(action);
    switch(action) {

        case 'View All Employees':
        viewAllEmployee();
        break;

        case 'Add employee':
        addEmployee();
        break;

        case 'Add Department':
        addDepartment();
        break;

        case 'Add Role':
        addRole();
        break;

        case 'View All Departments':
        viewAllDepartment();
        break;

        case 'View All Roles':
        viewAllRole();
        break;

        case 'Update Employee Role':
        updateRole();
        break;

        default:
        restart();
      }

})};


// Function to add an employee
const addEmployee = () => {

connection.query("SELECT title FROM ROLES", (err, data) => {
    if (err) throw err;
    let choices = []
    for (let i = 0; i < data.length; i++) {
        choices.push(data[i].title);
    }

    inquirer
    .prompt([
        {
        type: "input",
        message: "What is the first name of your employee?",
        name: "employeeFirstName"
        },
        {
        type: "input",
        message: "What is the last name of your employee?",
        name: "employeeLastName"
        },
        {
        type: "list",
        message: "What is this employee's role?",
        choices: choices,
        name: "employeeRole"
        },
        {
        type: "input",
        message: "Who is this person's manager?",
        name: "employeeManager"
        }
    ]).then(result => {

        const roleId = choices.indexOf(result.employeeRole) + 1;

        let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?);"

        connection.query(query, [result.employeeFirstName, result.employeeLastName, roleId, null], function(err) {if (err) throw err})
        restart();
})})};


// Function to add department
const addDepartment = () => {
    inquirer
    .prompt([
        {
        type: "input",
        message: "What is the name of this department?",
        name: "departmentName"
        }
    ]).then(result => {

        let query = "INSERT INTO department (department_type) VALUES (?);"

        connection.query(query, [result.departmentName], function(err) {if (err) throw err})
        restart();
    })};


// Function to add a role
const addRole = () => {

connection.query("SELECT department_type FROM DEPARTMENT", (err, data) => {
    if (err) throw err;
    let choices = []
    for (let i = 0; i < data.length; i++) {
        choices.push(data[i].department_type);
    }

    inquirer
    .prompt([
        {
        type: "input",
        message: "What is the title of this role?",
        name: "roleTitle"
        },
        {
        type: "input",
        message: "What is the annual salary of this position?",
        name: "roleSalary"
        },
        {
        type: "list",
        message: "What department does this role belong to?",
        choices: choices,
        name: "employeeRole"
        }
    ]).then(result => {


        // Finds the department id by finding index of input
        const depId = choices.indexOf(result.employeeRole) + 1;
        
        // Create SQL query
        let query = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);"

        connection.query(query, [result.roleTitle, result.roleSalary, depId], function(err) {if (err) throw err})

        // Bring user back to original prompt
        restart();


})})};



// Function to view all employees
const viewAllEmployee = () => {
    let query = "SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.department_type FROM employee INNER JOIN roles ON employee.role_id = roles.id INNER JOIN department on roles.department_id = department.id ORDER BY id asc;";
    connection.query(query, (err, data) => {
        if (err) throw err;
        console.table(data);
        restart();
})};


// Function to view all Roles
const viewAllRole = () => {
    let query = "SELECT roles.title FROM roles";
    connection.query(query, (err, data) => {
        if (err) throw err;
        console.table(data);
        restart();
})};

// Function to view all Departments
const viewAllDepartment = () => {
    let query = "SELECT department.department_type FROM department";
    connection.query(query, (err, data) => {
        if (err) throw err;
        console.table(data);
        restart();
})};


// Function to update role
const updateRole = () => {

    connection.query("SELECT CONCAT(first_name, ' ', last_name) AS name FROM employee;", (err, data) => {

        if (err) throw err;
        let choices = [];
        for (let i = 0; i < data.length; i++) {
            choices.push(data[i].name);
        }

        console.table(choices);

    inquirer
    .prompt([
        {
        type: "list",
        message: "Which employee's role do you wish to change?",
        name: "roleTitle",
        choices: choices
        },
    ]).then(result => {
        let query = ""

    })});
}

//Initialize default function
restart();

