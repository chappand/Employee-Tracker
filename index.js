const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: '',
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

    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;

    inquirer
        .prompt({
            name: 'viewEmployees',
            type: 'list',
            choices() {
                const choiceArray = [];
                    res.forEach((id, {first_name}, {last_name}) => {
                        choiceArray.push(id, first_name, last_name)
                    });
                    return choiceArray;
                },
            message: 'Which employee would you like to view?',

            })
            .then((answer) => {
                connection.query(
                    'SELECT * FROM employee_role LEFT JOIN department ON employee_role.department_id = department.id LEFT JOIN employee ON employee_role.id = employee.role_id', (err, res) => {
                        if (err) throw err;
                        console.table([answer.first_name, answer.last_name, answer.department_name, answer.title, answer.salary]);
                        startInquiry();
                    }
                );
            });
        });
}; 



connection.connect((err) => {
    if (err) throw err;
    startInquiry();
  });


