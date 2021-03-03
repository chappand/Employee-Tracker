INSERT INTO department (department_name)
VALUES 
('Marketing'),
('Accounting'),
('Human Resources');

INSERT INTO employee_role (title, salary, department_id)
VALUES 
('Manager', 100000, 1),
('Assistant', 50000, 1),
('Marketer', 75000, 1),
('Manager', 100000, 2),
('Assistant', 50000, 2),
('Accountant', 75000, 2),
('Manager', 100000, 3),
('Assistant', 50000, 3),
('HR Person', 75000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Maximiano', 'Sommer', 1, null),
('Boipelo', 'Babic', 2, 1),
('Linda', 'Fairburn', 3, 1),
('Sharif', 'Zsoldos', 4, null),
('Friederike', 'Hilton', 5, 4),
('Armando', 'Gates', 6, 4),
('Karissa', 'Adamić', 7, null),
('Diana', 'San Nicolás', 8, 7),
('Sassa', 'Tahirović', 9, 7);
