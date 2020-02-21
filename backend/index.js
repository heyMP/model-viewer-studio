const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(bodyParser.text({ type: "*/*" }));

app.post('/save', (req, res) => {
  console.log('req:', req.body)
  // load the existing file.
  const file = fs.readFileSync(path.join("../frontend/index.html"), "utf8");
  const $ = cheerio.load(file, { normalizeWhitespace: false });
  $("model-viewer").replaceWith(req.body);
  const newFile = $.html();
  fs.writeFileSync(path.join("../frontend/index.html"), newFile, "utf8");

  res.send("ok");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));