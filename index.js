const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'Wnd9n55b',
  database: 'employee_trackerDB',
});


const startInquiry = () => {
    inquirer
        .prompt({
        name: 'action',
        type: 'list',
        message: 'Would you like to View, Add, or Update employees?',
        choices: [
        'View',
        'Add',
        'Update',
        'Exit',
      ],
    })
    .then((answer) => {
        switch (answer.action) {
            case 'View':
                viewEmployees();
                break;
            
            case 'Add':
                addEmployees();
                break;

            case 'Update':
                updateEmployees();
                break;
            
            case 'Exit':
                connection.end();
                break;
            
            default:
                console.log(`Invalid action: ${answer.action}`);
                break;
        }
    });
};
    

const viewEmployees = () => {


   
                connection.query(
                    'SELECT * FROM employee_role LEFT JOIN department ON employee_role.department_id = department.id LEFT JOIN employee ON employee_role.id = employee.role_id', (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        startInquiry();
                    }
                );

}; 

const addEmployees = () => {
    inquirer
        .prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'What is the first name of the employee?'
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'What is the last name of the employee?'
        },
        {
            name: 'employeeRole',
            type: 'list',
            message: 'Which role will the employee have?',
            choices: ['Marketing Manager', 'Marketing Assistant', 'Marketer', 'Accounting Manager', 'Accounting Assistant', 'Accountant', 'Human Resources Manager', 'Human Resources Assistant', 'HR Person']
        }])
        .then((answer) => {
            const roleUpdate = (x,y) => {
                connection.query('INSERT INTO employee SET ?',
                [{
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: x,
                    manager_id: y
                }],
                (error) => {
                    if (error) throw err;
                    console.log('Employee added successfully!');
                })
            };
            switch (answer.employeeRole) {
                case 'Marketing Manager':
                    roleUpdate(1,null);
                    break;
                
                case 'Marketing Assistant':
                    roleUpdate(2,1);
                    break;
                
                case 'Marketer':
                    roleUpdate(3,1);
                    break;

                case 'Accounting Manager':
                    roleUpdate(4,null);
                    break;

                case 'Accounting Assistant':
                    roleUpdate(5,4);
                    break;

                case 'Accountant':
                    roleUpdate(6,4);
                    break;

                case 'Human Resources Manager':
                    roleUpdate(7,null);
                    break;

                case 'Human Resources Assistant':
                    roleUpdate(8,7);
                    break;

                case 'HR Person':
                    roleUpdate(9,7);
                    break;
            }
            startInquiry();
        })
}


const updateEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;

        inquirer
            .prompt({
                name: 'updateEmployees',
                type: 'list',
                choices() {
                    const choiceArray = [];
                        res.forEach(({first_name}) => {
                            choiceArray.push(first_name)
                        });
                        return choiceArray;
                    },
                message: 'Which employee would you like to update?',
    
                },
                {
                    name: 'whatUpdate',
                    type: 'list',
                    message: 'What would you like to update?',
                    choices: ['First Name', 'Last Name', 'Role ID', 'Manager ID']
                })
                .then((answer) => {
                    switch (answer.whatUpdate) {
                        case 'First Name':
                            inquirer.prompt({
                                name: 'firstNameUpdate',
                                type: 'input',
                                message: 'What would you like to set the first name to?'
                            }).then((answer) => {
                                connection.query('UPDATE employee SET ? WHERE ?',
                                [{
                                    first_name: answer.updateEmployees
                                },
                                {
                                    first_name: answer.firstNameUpdate
                                }],
                                (error) => {
                                    if (error) throw err;
                                    console.log('First Name updated successfully!');
                                    startInquiry();
                            })}) 
                            break;  
                        
                        case 'Last Name':
                            inquirer.prompt({
                                name: 'lastNameUpdate',
                                type: 'input',
                                message: 'What would you like to set the last name to?'
                            }).then((answer) => {
                                connection.query('UPDATE employee SET ? WHERE ?',
                                [{
                                    first_name: answer.updateEmployees
                                },
                                {
                                    last_name: answer.lastNameUpdate
                                }],
                                (error) => {
                                    if (error) throw err;
                                    console.log('Last Name updated successfully!');
                                    startInquiry();
                            })}) 
                            break;

                        case 'Role ID':
                            inquirer.prompt({
                                name: 'roleIDUpdate',
                                type: 'input',
                                message: 'What would you like to set the role ID to?'
                            }).then((answer) => {
                                connection.query('UPDATE employee SET ? WHERE ?',
                                [{
                                    first_name: answer.updateEmployees
                                },
                                {
                                    role_id: answer.roleIDUpdate
                                }],
                                (error) => {
                                    if (error) throw err;
                                    console.log('Role ID updated successfully!');
                                    startInquiry();
                            })}) 
                            break;

                        case 'Manager ID':
                            inquirer.prompt({
                                name: 'managerIDUpdate',
                                type: 'input',
                                message: 'What would you like to set the manager ID to?'
                            }).then((answer) => {
                                connection.query('UPDATE employee SET ? WHERE ?',
                                [{
                                    first_name: answer.updateEmployees
                                },
                                {
                                    manager_id: answer.managerIDUpdate
                                }],
                                (error) => {
                                    if (error) throw err;
                                    console.log('Manager ID updated successfully!');
                                    startInquiry();
                            })}) 
                            break;
                        
                        default:
                            console.log(`Invalid action: ${answer.updateEmployees}`);
                            break;
                }
            })
        })
     }




connection.connect((err) => {
    if (err) throw err;
    startInquiry();
  });


