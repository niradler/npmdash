#!/usr/bin/env node
require("dotenv").config();
const program = require("commander");
const open = require("open");
const execa = require("execa");

program.option("-u, --username <name>", "npmjs username").action(username => {
  if (username && typeof username === "string") {
    const port = process.env.PORT || 8989;
    const url = `http://localhost:${port}/npm/dashboard/${username}`;
    open(url);
    execa
      .shell("npm run start", {
        cwd: process.cwd()
      })
      .then(data => console.log({ data }))
      .catch(error => console.error(error));
  } else {
    console.log("username is mandatory.");
    program.help();
  }
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}
