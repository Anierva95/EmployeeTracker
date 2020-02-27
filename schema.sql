DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department
(
    id int NOT NULL AUTO_INCREMENT,
    department_type VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles
(
    id int NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(60,2) NOT NULL,
    department_id int NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee
(
    id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id int NOT NULL,
    manager_id int,
    FOREIGN KEY(role_id) REFERENCES roles(id),
    FOREIGN KEY(manager_id) REFERENCES roles(id),
    PRIMARY KEY(id)
);