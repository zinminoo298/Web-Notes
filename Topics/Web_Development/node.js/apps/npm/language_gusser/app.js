import { franc, francAll } from "franc";
import langs from "langs";
import colors from "colors";

try {
  // get the text from the terminal
  const text = process.argv[2];
  // guess the language
  const res = francAll(text, { minLength: 5 });
  const langCode = res[0][0];
  if (langCode === "und") {
    console.log("Insufficient data to guess, try again with more words".yellow);
  } else {
    // match the language code and name
    const langName = langs.where("3", langCode);
    // franc and langs mismatch some  ISO 639-1/2/3  codes, so it is impossible to get some language,
    if (langName === undefined) {
      console.log("Sorry I coudln't guess the language".red);
    }
    // print out the name of the language
    console.log(`Our guess is ~~~ ${langName.name.green}`);
  }
} catch (e) {
  console.log("Sorry!".dim);
}
