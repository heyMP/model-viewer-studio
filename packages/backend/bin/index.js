#!/usr/bin/env node

const chalk = require("chalk");
const program = require('commander');
const server = require("../server.js");

program
  .arguments('<target>')
  .action(function (_target) {
    target = _target
  })
  .option('-p, --port <number>', 'specify port. defaults to 3000');

program.parse(process.argv);

if (typeof target === 'undefined') {
  console.log(chalk.red.bold("You need to specify an HTML file containing your model."));
  process.exit(1);
}

server({ target, port: program.port });