USE employee_db;

INSERT INTO employeeInfo (first_name, last_name, title, manager)
VALUES ("Joe", "Exotic","Software Engineer", 2), ("Sally", "Jones", "Lawyer", 4), ("Kevin", "Johnson", "Lead Engineer", 2), ("Avery", "Williams", "Sales Team", 3), ("Maeve", "Roberts", "Accountant", 1);

INSERT INTO departmentInfo(department)
VALUES("Finance"),("Engineering"),("Sales"),("Legal");

INSERT INTO roleInfo(title, salary, manager, department_id)
VALUES("Legal Team", 80000, "Eddie Smith", 4),("Lead Engineer", 85000, "None", 2),("Software Engineer", 75000, "John Doe", 2), ("Sales Team", 45000, "Debra Collins", 3), ("Lawyer",92000, "Joshua Beck", 4), ("Accountant", 65000, "Peter Williams", 1);

