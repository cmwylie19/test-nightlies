const setupServeCommand = require("./cmd/serve");
const setupVersionCommand = require("./cmd/version");
const { Command } = require("commander");

const program = new Command();
program.addCommand(setupServeCommand());
program.addCommand(setupVersionCommand());

program.parse(process.argv);
