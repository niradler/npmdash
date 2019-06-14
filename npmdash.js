#!/usr/bin/env node
require("dotenv").config();
const program = require("commander");
const open = require("open");
const execa = require("execa");

program.option("-u, --username [name]", "npmjs username");
program.parse(process.argv);

const { username } = program;
const port = process.env.PORT || 8989;
let url = `http://localhost:${port}`;
if (username && typeof username === "string") {
  url = `http://localhost:${port}/npm/dashboard/${username}`;
}
open(url).then(() => console.log(`running on http://localhost:${port}`));
execa
  .shell("npm run start", {
    cwd: __dirname,
    env: process.env
  })
  .then(data => console.log({ data }))
  .catch(error => console.error(error));
