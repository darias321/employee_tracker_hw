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
  employees.push({ value: -1, name: "None" });
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
        type: "list",
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
  inquirer
    .prompt({
      message: "Enter the department name:",
      type: "input",
      name: "name",
    })
    .then(function (answer) {
      connection.queryPromise("INSERT INTO departments (name) VALUES (?)", [
        answer.name,
      ]);
      init();
    });
};
const addRole = () => {
  connection
    .queryPromise("SELECT * FROM departments")
    .then(function (departments) {
      console.log(departments);
      return inquirer.prompt([
        {
          message: "Enter Role Title",
          type: "input",
          name: "title",
        },
        {
          message: "Enter the salary",
          type: "input",
          name: "salary",
        },
        {
          message: "Select the department",
          type: "list",
          name: "department_id",
          choices: departments.map(function (department) {
            return {
              name: department.name,
              value: department.id,
            };
          }),
        },
      ]);
    })
    .then(function (answer) {
      console.log(answer);

      connection.queryPromise(
        "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)",
        [answer.title, answer.salary, answer.department_id]
      );
      init();
    });
};

const viewDepartments = () => {
  connection.queryPromise("SELECT * FROM departments", (error, data) => {
    console.table(data);
    init();
  });
};
const viewEmployees = () => {
  connection.queryPromise(
    "SELECT employees.first_name, employees.last_name, roles.title FROM employees INNER JOIN roles on roles.id = employees.role_id",
    (error, data) => {
      console.table(data);
      init();
    }
  );
};

const viewRoles = () => {
  connection
    .queryPromise(
      "SELECT roles.title, roles.salary, departments.name FROM roles INNER JOIN departments on departments.id = roles.department_id"
    )
    .then((data) => {
      console.table(data);
    });
};

const updateEmployeeRole = async () => {
  let employees = await connection.queryPromise("SELECT * FROM employees");
  let roles = await connection.queryPromise("SELECT * FROM roles");
  return inquirer
    .prompt([
      {
        message: "Which employee would you like to update?",
        type: "list",
        name: "employeeId",

        choices: employees.map(function (employees) {
          return {
            name: employees.first_name + " " + employees.last_name,
            value: employees.id,
          };
        }),
      },
      {
        message: "Which role would you like to update?",
        type: "list",
        name: "roleId",

        choices: roles.map(function (roles) {
          return {
            name: roles.title,
            value: roles.id,
          };
        }),
      },
    ])
    .then((answers) => {
      answers.roleId;
      answers.employeeId;
      let updatedEmployee = connection.queryPromise(
        "UPDATE employees SET role_id = ? WHERE id = ? ",
        [answers.roleId, answers.employeeId]
      );
      init();
    });
};

const init = () => {
  const choices = [
    "ADD_DEPARTMENT",
    "ADD_ROLE",
    "ADD_EMPLOYEE",
    "VIEW_DEPARTMENT",
    "VIEW_ROLES",
    "VIEW_EMPLOYEES",
    "UPDATE_EMPLOYEE_ROLE",
    "DONE",
  ];
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

      if (answers.choice === "ADD_DEPARTMENT") {
        addDepartment();
      }

      if (answers.choice === "ADD_ROLE") {
        addRole();
      }

      if (answers.choice === "VIEW_DEPARTMENT") {
        viewDepartments();
      }

      if (answers.choice === "VIEW_ROLES") {
        viewRoles();
      }

      if (answers.choice === "VIEW_EMPLOYEES") {
        viewEmployees();
      }
      if (answers.choice === "UPDATE_EMPLOYEE_ROLE") {
        updateEmployeeRole();
      }
      // check their response
      // if their was "Add Employee" => call addEmployee() function
    });
};
init();
