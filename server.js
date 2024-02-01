const express = require("express");
const utils = require("./modules/utils");
const lang = require("./lang/en/en.json");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/COMP4537/labs/3/getDate", (req, res) => {
  const name = req.query.name || "Guest";
  const dateTime = utils.getDate();
  const greeting = lang.greeting.replace("%s", name).replace("%s", dateTime);
  res.send(`<span style=color: skyblue;">${greeting}</span>`);
});

//WRITING TO A FILE
app.get("/COMP4537/labs/3/writeFile", (req, res) => {
  const textToAppend = req.query.text + "\n"; //getting the text from the query and add a newline character
  const filePath = path.join(__dirname, "file.txt"); //defining the path to the file

  //appending the text to the file, or create the file if it does not exist
  fs.appendFile(filePath, textToAppend, (err) => {
    if (err) {
      return res.status(500).send("Error writing to the file");
    }
  });
  res.send("Text appended to the file successfully.");
});

//READING FROM A FILE
app.get("/COMP4537/labs/3/readFile/:filename", (req, res) => {
  const fileName = req.params.filename; //getting the filename from the url parameter
  const filePath = path.join(__dirname, fileName); //defining the path to the file

  //reading the file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        //if the file doesn't exist, sending a 404 error
        return res.status(404).send(`File not found: ${fileName}`);
      }
      //for other errors sending a 500 server error
      return res.status(500).send("Error reading from the file");
    }
    res.send(data); //sending the content of the file
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
