const http = require("http");
const url = require("url");
const lang = require("./lang/en/en.json");
const utils = require("./modules/utils.js");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    let name = req.url.split("=")[1];
    const serverTime = utils.getDate();
    const message = lang.greeting.replace("%s", name).replace("%s", serverTime);

    res.write(`<div style="color:blue;">${message}</div>`);
    res.end();
  })
  .listen(8081);