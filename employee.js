const express = require("express");
const mysql = require("mysql");
const inquirer = require("inquirer");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "362514331Aa'",
    database: "employee_db"
  });

  connection.connect(function(err) {
  if (err) {
      console.error("error connecting: " + err.stack);
      return;
  }
  console.log("connected as id " + connection.threadId);
});

const restart = () => {
console.log('------------------------------------------')
inquirer
.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: ['View All Employees', 'View All Employees by Department', 'View All Employees by role', 'Add Department', 'Add Role', 'Add employee']
      }
]).then(function(result) {
    console.log(result.action);
    if (result.action === "View All Employees") {
        connection.query("SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.department_type FROM employee INNER JOIN roles ON employee.role_id = roles.id INNER JOIN department on roles.department_id = department.id ORDER BY id asc;", function(err, data) {
            if (err) throw err;
            console.log('');
            console.table(data);
            console.log('');
        });
    }
    restart();
})}

restart();