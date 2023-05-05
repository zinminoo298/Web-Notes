import { fstat, mkdir, mkdirSync, writeFileSync } from "fs";
import { writeFile } from "fs";
import { Buffer } from "buffer";

const folderName = process.argv[2] || "Project";

try {
  mkdirSync(folderName);
  writeFileSync(`${folderName}/app.js`, "");
  writeFileSync(`${folderName}/app.css`, "");
  writeFileSync(`${folderName}/app.html`, "");
} catch (e) {
  console.log(e);
}
