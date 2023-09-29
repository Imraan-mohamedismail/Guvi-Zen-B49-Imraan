const express = require("express");
const fs = require("fs");
const path = require("path");

const outputFolder = "./outPut";

console.log(
  "to check whether the folder is already there are not",
  fs.existsSync(outputFolder)
);

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

const app = express();
const PORT = 3000;

app.get("/createFile", (req, res) => {
  const currentTime = new Date();

  console.log(currentTime);

  const year = currentTime.getFullYear().toString();
  const month = (currentTime.getMonth() + 1).toString();
  const date = currentTime.getDate().toString();
  const hour = currentTime.getHours().toString();
  const min = currentTime.getMinutes().toString();
  const sec = currentTime.getSeconds().toString();

  const dateTimeForFileName = `${year}-${month}-${date}-${hour}-${min}-${sec}.txt`;

  const filePath = path.join(outputFolder, dateTimeForFileName);

  console.log("Filepath:", filePath);

  fs.writeFile(filePath, currentTime.toISOString(), (err) => {
    if (err) {
      res.status(500).send(`error creating file: ${err}`);
      return;
    }
    res.send(`file created successfully at: ${filePath}`);
  });
});

app.get("/getFiles", (req, res) => {
  fs.readdir(outputFolder, (err, files) => {
    if (err) {
      res.status(500).send(`error reading directory: ${err}`);
      return;
    }
    console.log("files:", files);

    const textFiles = files.filter((file) => path.extname(file) === ".txt");

    res.json(textFiles);
  });
});

app.listen(PORT, () => {
  console.log("server is running on port:", PORT);
});
