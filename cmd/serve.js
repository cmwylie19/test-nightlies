const { Command } = require("commander");
const Server = require("../lib/server");
function setupServeCommand() {
  const program = new Command("serve");

  program
    .description("Serve the webapp")
    .option("-p, --port <port>", "Port to serve the webapp on", 8080)
    .action((opts) => {
      const server = new Server(opts.port);
      server.start();
    });

  return program;
}

module.exports = setupServeCommand;
