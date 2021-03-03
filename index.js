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

connection.connect((err) => {
  if (err) throw err;
  startInquiry();
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
    