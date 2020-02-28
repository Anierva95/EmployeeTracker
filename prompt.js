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
    choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Department', 'Add Role', 'Add employee']
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

        default:
        restart();
      }

})};


// Function to add an employee
const addEmployee = () => {
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
        choices: ["Sales Person", "Sales Lead", "Lawyer", "Lead Engineer", "Accountant", "Legal Team Lead", "Software Engineer", "Janitor"],
        name: "employeeRole"
        },
        {
        type: "input",
        message: "Who is this person's manager?",
        name: "employeeManager"
        }
    ]).then(result => {

        const role = convertRoleToId(result.employeeRole);

        let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?);"

        connection.query(query, [result.employeeFirstName, result.employeeLastName, role, null], function(err) {if (err) throw err})
        restart();
    })};


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
        choices: () => {
            const choices = [];
            connection.query("SELECT department_type FROM DEPARTMENT", (err, data) => {
                if (err) throw err;
        
                for (let i = 0; i < data.length; i++) {
                    choices.push(data[i].department_type);
                }
        
                return choices
            })},
        name: "employeeRole"
        }
    ]).then(result => {

        const role = convertRoleToId(result.employeeRole);

        let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?);"

        connection.query(query, [result.employeeFirstName, result.employeeLastName, role, null], function(err) {if (err) throw err})
        restart();
    })};




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

// Function to convert Role to respective ID
const convertRoleToId = (role) => {

    switch(role) {

        case 'Sales Person':
        return 1; 

        case 'Sales Lead':
        return 2; 
        break;

        case 'Lawyer':
        return 3; 
        break;

        case 'Lead Engineer':
        return 4; 
        break;
        
        case 'Accountant':
        return 5; 
        break;

        case 'Legal Team Lead':
        return 6; 
        break;

        case 'Software Engineer':
        return 7; 
        break;

        case 'Janitor':
        return 8; 
        break;
      }
}


//Initialize default function
// restart();

getchoices = () => {
    const choices = [];
    connection.query("SELECT department_type FROM DEPARTMENT", (err, data) => {
        if (err) throw err;

        for (let i = 0; i < data.length; i++) {
            choices.push(data[i].department_type);
        }

        return choices
    })}

    getchoices();
