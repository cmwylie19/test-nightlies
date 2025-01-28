const express = require("express");

class Server {
  constructor(port = 8080, version = "0.0.0") {
    this.port = port;
    this.version = version;
    this.app = express();
  }

  start() {
    this.app.get("/healthz", (req, res) => {
      res.status(200).send("ok");
    });

    this.app.get("/", (req, res) => {
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
        <title>Simplest</title>
        <style>
            h1 {
            transition: all 0.3s ease;
            }

            h1:hover {
            font-style: italic;
            color: blue;
            }
        </style>
        </head>
        <body style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
        <h1>Release me please!</h1>
        <p>v${this.version}</p>
        </body>
        </html>
            `);
    });

    this.app.listen(this.port, () => {
      console.log(`Webapp listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
