const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = ({ target, port = 3000 }) => {
  const TARGET = target;
  const TARGET_DIR = path.dirname(TARGET);
  const app = express();
  // get a list of all the files it should convert to static
  const sourceFiles = fs.readdirSync(TARGET_DIR);

  app.use(cors());
  app.use(bodyParser.text({ type: "*/*" }));

  // set up static for all files
  let staticAssetsIdentified = [];
  for (const file of sourceFiles) {
    if (file !== path.basename(TARGET)) {
      staticAssetsIdentified = [...staticAssetsIdentified, file];
      app.use(`/${file}`, express.static(path.join(TARGET_DIR, file)));
    }
  }
  console.log("Setting the following as static assets: ", staticAssetsIdentified);

  app.use("/src", express.static("templates/frontend/src"));
  app.use("/web_modules", express.static("templates/frontend/web_modules"));

  app.get("/", (req, res) => {
    const file = fs.readFileSync(path.join(TARGET), "utf8");
    const $ = cheerio.load(file, { normalizeWhitespace: false });
    $("body").append(`
  <x-toolbar></x-toolbar>
  <x-panel></x-panel>
  <x-preview style="height:100vh;"></x-preview>
  <script src="src/index.js" type="module"></script>
  <script
    nomodule
    src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"
  ></script>
    `);
    $("model-viewer").appendTo("x-preview");
    res.send($.html());
  });

  app.get("/ping", (req, res) => {
    res.send("ok");
  });

  app.post("/save", (req, res) => {
    // load the existing file.
    const file = fs.readFileSync(path.join(TARGET), "utf8");
    const $ = cheerio.load(file, { normalizeWhitespace: false });
    $("model-viewer").replaceWith(req.body);
    const newFile = $.html();
    fs.writeFileSync(path.join(TARGET), newFile, "utf8");

    res.send("ok");
  });

  app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}!`));
}

