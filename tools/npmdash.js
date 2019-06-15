#!/usr/bin/env node
require("dotenv").config();
const program = require("commander");
const localRun = require("./localRun");

program.option("-u, --username [name]", "npmjs username");
program.parse(process.argv);

const { username } = program;

localRun(username);
