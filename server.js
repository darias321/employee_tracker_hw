const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "He11o321",
  database: "employee_db",
});

connection.queryPromise = util.promisify(connection.query);
connection.connect((err) => {
  if (err) throw err;
  console.log("we have been connected");
  //   seeAllEmployees().then((res) => {
  //     console.log(res);
});
const getRoles = () => {
  return connection.queryPromise("SELECT * FROM roles");
};
const getEmployees = () => {
  return connection.queryPromise("SELECT * FROM employees");
};
const getDepartments = () => {
  return connection.queryPromise("SELECT * FROM departments");
};
const addEmployee = async () => {
  let roles = await getRoles();
  let employees = await getEmployees();
  roles = roles.map((role) => {
    return {
      name: role.title,
      value: role.id,
    };
  });
  employees = employees.map((employee) => {
    return {
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    };
  });
  employee.push({ value: -1, name: "None" });
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
        type: "list",
        name: "role_id",
        message: "Select employee's role",
        choices: roles,
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter employee's manager ID (if applicable)",
        choices: employees,
      },
    ])
    .then((res) => {
      let query;
      let values;
      // if the employee has no manager
      if (res.manager_id === -1) {
        query =
          "INSERT INTO employees (first_name, last_name, role_id) VALUES(?,?,?);";
        values = [res.first_name, res.last_name, res.role_id];
      } else {
        query =
          "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?);";
        values[(res.first_name, res.last_name, res.role_id, res.manager_id)];
      }
      connection.query(query, values, (err, data) => {
        if (err) {
          console.log(err);
          throw err;
        }
        console.log("employee successfully");
        init();
      });
    });
};
const addDepartment = () => {
  // ask for the department name
  // insert the department in the database
};
const addRole = () => {
  // ask for title, salary, deptartment
  // list departments as choices like we did for roles in addEmployees()
  // insert role in database
};
const viewDepartments = () => {
  // list out departments
};
const viewEmployees = () => {
  // list out the employees
  // make sure you list managers by name
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
const init = () => {
  const choices = ["ADD_EMPLOYEE", "VIEW_EMPLOYEES", "DONE"];
  inquirer
    .prompt({
      // ask what they would like to do
      // it should be a list of things
      name: "choice",
      message: "What would you like to",
      type: "list",
      choices: choices,
      // list with choices of the choices array
    })
    .then((answers) => {
      if (answers.choice === "ADD_EMPLOYEE") {
        addEmployee();
      }
      if (answers.choice === "DONE") {
        connection.end();
      }
      // check their response
      // if their was "Add Employee" => call addEmployee() function
    });
};
init();
