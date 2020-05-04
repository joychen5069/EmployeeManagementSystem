DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employeeInfo(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    title VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    manager VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

-- example insert
INSERT INTO employeeInfo (first_name, last_name, title, department, manager)
VALUES ("Joe", "Exotic","Software Engineer", "Engineering","Carole Baskins");