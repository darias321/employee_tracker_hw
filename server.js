const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "He11o321",
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("we have been connected");

  //   seeAllEmployees().then((res) => {
  //     console.log(res);
  connection.end();
});

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter employee's first name",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter employee's last name",
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter employee's role ID",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter employee's manager ID (if applicable)",
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?);",
        [res.first_name, res.last_name, res.role_id, res.manager_id]
        (err,data) => {
            if (err) {
                console.log(err); 
                throw err; 
            }
            console.log("employee successfully"); 
        }
       
      );
    });
};

// });

// const seeAllEmployees = () => {
//   return new Promise((resolve, reject) => {
//     connection.query("SELECT * FROM employees", (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };
