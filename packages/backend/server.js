const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const prettier = require("prettier");
const cors = require("cors");

module.exports = ({ target, opts = {}, port = 3000 }) => {
  const TARGET = target;
  const TARGET_DIR = path.dirname(TARGET);
  const app = express();
  // get a list of all the files it should convert to static
  const sourceFiles = fs.readdirSync(TARGET_DIR);

  app.use(cors());
  app.use(bodyParser.text({ type: "*/*" }));

  if (opts.headless) {
    // setup nothing
  }
  else {
    // set up static for all files
    let staticAssetsIdentified = [];
    for (const file of sourceFiles) {
      if (file !== path.basename(TARGET)) {
        staticAssetsIdentified = [...staticAssetsIdentified, file];
        app.use(`/${file}`, express.static(path.join(TARGET_DIR, file)));
      }
    }
    console.log("Setting the following as static assets: ", staticAssetsIdentified);

    app.use("/src", express.static(path.join(__dirname, "./templates/frontend/src")));
    app.use("/web_modules", express.static(path.join(__dirname, "./templates/frontend/web_modules")));

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
      $("model-viewer").appendTo("mvs-preview");
      res.send($.html());
    });
  }

  app.get("/ping", (req, res) => {
    res.send("ok");
  });

  app.post("/save", (req, res) => {
    try {
      let fileLocation = null;
      // if we are running in headless mode then we need to expect
      // an on demand location variable.
      if (opts.headless) {
        let { location } = req.query;
        fileLocation = path.join(TARGET, location);
      }
      else {
        fileLocation = path.join(TARGET);
      }
      // load the existing file.
      const file = fs.readFileSync(fileLocation);
      const $ = cheerio.load(file, { normalizeWhitespace: false });
      $("model-viewer").replaceWith(req.body);
      let newFile = $('body').html();
      // if prettier is turned on then format it.
      if (opts.format) {
        newFile = prettier.format(newFile, { semi: false, parser: "babel" });
      }
      fs.writeFileSync(fileLocation, newFile, "utf8");
      res.send("ok");
    } catch (error) {
      console.error(error);
    }
  });

  app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}!`));
}

