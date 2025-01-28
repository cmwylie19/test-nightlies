const { Command } = require("commander");
const packageJSON = require("../package.json");

function setupVersionCommand() {
  const program = new Command("version");

  program.description("Version of the webapp").action(() => {
    console.log(`v${packageJSON.version}`);
  });

  return program;
}

module.exports = setupVersionCommand;
