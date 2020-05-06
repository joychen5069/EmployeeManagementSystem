USE employee_db;

INSERT INTO employeeInfo (first_name, last_name, title, department, manager)
VALUES ("Joe", "Exotic","Software Dev", "Engineering","Carole Baskins");

INSERT INTO departmentInfo(name)
VALUES("Finance"),("Engineering"),("Sales"),("Legal");

INSERT INTO roleInfo(title, salary, department_id)
VALUES("Legal Team", 80000, 4),("Lead Engineer", 85000, 2),("Software Engineer", 75000, 2), ("Sales Team", 45000, 3), ("Lawyer",92000,4), ("Accountant", 65000, 1)