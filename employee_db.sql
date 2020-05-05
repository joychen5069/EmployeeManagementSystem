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

INSERT INTO employeeInfo (first_name, last_name, title, department, manager)
VALUES ("Joe", "Exotic","Software Dev", "Engineering","Carole Baskins");

CREATE TABLE departmentInfo(
	id INT NOT NULL auto_increment,
    name VARCHAR(30),
    PRIMARY KEY (id)
);
    
INSERT INTO departmentInfo(name)
VALUES("Accounting"),("Finance"),("Engineering"),("Sales"),("legal");

CREATE TABLE roleInfo(
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
    );

INSERT INTO roleInfo(title, salary, department_id)
VALUES("Legal Team", 80000, 4)
