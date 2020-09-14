DROP DATABASE IF EXISTS employee_db; 
CREATE DATABASE employee_db; 
USE employee_db


INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Danielle", "Arias", 4); 

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ever", "Patindol", 7,2); 

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Jesus", "Orozco", 3); 

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Patrick", "Poon", 4); 

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Itzel", "Ortuno", 6,1); 

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Emily", "Fox", 5); 

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Daniel", "Medina", 8);


INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Lawyer", 200000, 3); 

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 175000, 4); 


INSERT INTO departments (name)
VALUES ("Sales"); 

INSERT INTO departments (name)
VALUES ("Engineering"); 

INSERT INTO departments (name)
VALUES ("Legal"); 

INSERT INTO departments (name)
VALUES ("Finance"); 

SELECT * FROM employees; 
SELECT * FROM roles; 
SELECT * FROM departments; 


