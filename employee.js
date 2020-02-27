const inquirer = require("inquirer");
// const queries = require("./query");
const connection = require("./connection");


const restart = function() {
inquirer
.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "action",
    choices: ['View All Employees', 'View All Employees by Department', 'View All Employees by role', 'Add Department', 'Add Role', 'Add employee']
    }
]).then(function(result) {
    let query = "SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.department_type FROM employee INNER JOIN roles ON employee.role_id = roles.id INNER JOIN department on roles.department_id = department.id ORDER BY id asc;";
    if (result.action === "View All Employees") {
    connection.query(query, function(err, data) {
        if (err) throw err;
        console.table(data);
        restart();
    })}
    else {
        restart();
    }
})};

restart();
