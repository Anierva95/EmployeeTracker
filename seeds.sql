USE employee_db;

INSERT INTO department (department_type) VALUES ('Sales');
INSERT INTO department (department_type) VALUES ('Engineering');
INSERT INTO department (department_type) VALUES ('Finance');
INSERT INTO department (department_type) VALUES ('Legal');
INSERT INTO department (department_type) VALUES ('Trash');

INSERT INTO roles (title, salary, department_id) VALUES ('Sales Person', 80000.00, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Sales Lead', 100000.00, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Lawyer', 190000.00, 4);
INSERT INTO roles (title, salary, department_id) VALUES ('Lead Engineer',150000.00, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Accountant', 125000.00, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Legal Team Lead', 250000.00, 4);
INSERT INTO roles (title, salary, department_id) VALUES ('Software Engineer', 120000.00, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Janitor', 10.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jargon', 'Mcfargon', 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jimbo', 'Winbo', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Wombo', 'Combo', 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Wingle', 'Wang', 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Windle', 'Bindle', 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('RJ', 'Barrett', 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Julius', 'Randle', 8, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Rango', 'Bango', 7, null);



