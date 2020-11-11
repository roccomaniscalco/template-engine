const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

let teamName;
let employeeType;
let employeeCount = 0;
const employees = [];

generateHTML = () => {
  const content = render(employees, teamName);
  fs.writeFile("./output/team.html", content, (err) => {
    if (err) throw err;
    console.log();
    console.log("team.html successfully created in /output!");
  });
};

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
  console.log();
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
      if (employeeType == "Exit") generateHTML();
      else promptEmployeeInfo();
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