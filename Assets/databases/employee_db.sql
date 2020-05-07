DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employeeInfo(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    title VARCHAR(50) NOT NULL,
    manager INT,
    PRIMARY KEY (id)
);

CREATE TABLE departmentInfo(
	id INT NOT NULL auto_increment,
    department VARCHAR(30),
    PRIMARY KEY (id)
);
    
CREATE TABLE roleInfo(
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
    );

