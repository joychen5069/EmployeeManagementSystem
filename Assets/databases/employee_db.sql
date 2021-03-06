DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;



CREATE TABLE departmentInfo(
	id INT NOT NULL auto_increment,
    department VARCHAR(30),
    PRIMARY KEY (id)
);
    
CREATE TABLE roleInfo(
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    manager VARCHAR(30) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
    );
    
    CREATE TABLE employeeInfo(
    employee_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    title VARCHAR(50) NOT NULL,
    manager_id INT,
    PRIMARY KEY (employee_id)  
);

