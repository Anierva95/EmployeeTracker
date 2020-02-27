const employee = require("./employee");
const connection = require("./connection");

function querySwitch(result) {
    const action = result.action;
    // console.log(action);
    // console.log("Made it to switch statement")
    switch(action) {
        case 'View All Employees':  
        let query = "SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.department_type FROM employee INNER JOIN roles ON employee.role_id = roles.id INNER JOIN department on roles.department_id = department.id ORDER BY id asc;"
        connection.query(query, function(err, data) {
            if (err) throw err;
            console.log('');
            console.table(data);
            console.log('');
            employee.restart();
        });

    }
}

module.exports = {
    querySwitch: querySwitch
}