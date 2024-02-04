// const http = require("http");
// const path = require("path");
const lang = require("./lang/en/en.json");
const utils = require("./modules/utils");

// const PORT = process.env.PORT || 3000;

// const requestHandler = (req, res) => {
//   if (req.url.startsWith("/COMP4537/labs/3/getDate")) {
//     const url = new URL(req.url, `http://${req.headers.host}`);
//     const name = url.searchParams.get("name") || "Guest";
//     const serverTime = utils.getDate();
//     const message = lang.greeting.replace("%s", name).replace("%s", serverTime);

//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end(`${message}`);
//   } else {
//     res.writeHead(404);
//     res.end("Not Found");
//   }
// };

module.exports = (req, res) => {
  const url = new URL(`https://${req.headers.host}${req.url}`);
  const name = url.searchParams.get("name") || "Guest";
  const serverTime = utils.getDate();
  const message = lang.greeting.replace("%s", name).replace("%s", serverTime);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`<div style="color: blue;">${message}</div>`);
};

// const server = http.createServer(requestHandler);

// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
