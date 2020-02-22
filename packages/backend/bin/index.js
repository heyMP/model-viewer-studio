#!/usr/bin/env node

const chalk = require("chalk");
const server = require("../server.js");

let target;
if (process.argv && process.argv[2]) {
  target = process.argv[2];
}
else {
  console.log(chalk.red.bold("You need to specify an HTML file containing your model."));
  process.exit(1);
}
let port = process.env.PORT || "3000";

server({ target, port });