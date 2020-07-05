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

  seeAllEmployees().then((res) => {
    console.log(res);
    connection.end();
  });
});

const seeAllEmployees = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM employees", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
