const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");
const Employee = require("./lib/Employee");

let teamName;
let employeeType;
let employeeCount = 0;
const employees = [];

promptTeamName = () => {
  inquirer
    .prompt([
      {
        name: "name",
        message: "Team Name:",
      },
    ])
    .then((team) => {
      teamName = team.name;
      promptEmployeeType();
    });
};

promptEmployeeType = () => {
  console.log("");
  inquirer
    .prompt([
      {
        type: "list",
        name: "type",
        message: "Employee Type:",
        choices: [Engineer, Intern, Manager, new inquirer.Separator(), "Exit"],
      },
    ])
    .then((employee) => {
      employeeType = employee.type;
      if (employeeType != "Exit") promptEmployeeInfo();
    });
};

promptEmployeeInfo = () => {
  inquirer
    .prompt([
      {
        name: "name",
        message: `${employeeType} Name:`,
      },
      {
        name: "email",
        message: `${employeeType} Email:`,
      },
    ])
    .then((genericInfo) => {
      switch (employeeType) {
        case "Engineer":
          inquirer
            .prompt([
              {
                name: "github",
                message: "Engineer Github:",
              },
            ])
            .then((specificInfo) => {
              employeeCount++;
              employees.push(
                new Engineer(
                  genericInfo.name,
                  employeeCount,
                  genericInfo.email,
                  specificInfo.github
                )
              );
              promptEmployeeType();
            });

          break;
        case "Intern":
          inquirer
            .prompt([
              {
                name: "school",
                message: "Intern School:",
              },
            ])
            .then((specificInfo) => {
              employeeCount++;
              employees.push(
                new Intern(
                  genericInfo.name,
                  employeeCount,
                  genericInfo.email,
                  specificInfo.school
                )
              );
              promptEmployeeType();
            });

          break;
        case "Manager":
          inquirer
            .prompt([
              {
                type: "number",
                name: "office",
                message: "Manager Office #:",
              },
            ])
            .then((specificInfo) => {
              employeeCount++;
              employees.push(
                new Manager(
                  genericInfo.name,
                  employeeCount,
                  genericInfo.email,
                  specificInfo.office
                )
              );
              promptEmployeeType();
            });
      }
    });
};

promptTeamName();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
