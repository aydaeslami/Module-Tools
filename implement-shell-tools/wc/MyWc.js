import { program } from "commander";
import { promises as fs } from "node:fs";
import process from "node:process";

program
  .name("myLs")
  .description("my ls clone")
  .option("-l", "line count")
  .option("-w", "words count")
  .option("-c", "character count")
  .option("-s", "character count without spaces")
  .argument("[paths...]", "file or directory paths");

program.parse();

const opts = program.opts();
let files = program.args;

if (files.length === 0) {
  files = ["."];
}

let totalLines = 0;
let totalWords = 0;

if (opts.l) {
  for (const file of files) {
    const content = await fs.readFile(file, "utf-8");
    console.log(content);
    const lineCount = content.split("\n").length;

    totalLines += lineCount;
  }
  console.log("Lines:", totalLines);
}
if (opts.w) {
  for (const file of files) {
    const content = await fs.readFile(file, "utf-8");
    console.log(content);

    const wordCount = content.trim().split(/\s+/).length;
    totalWords += wordCount;
  }
  console.log("Total words:", totalWords);
}
if (opts.c) {
  let totalChars = 0;
  for (const file of files) {
    const content = await fs.readFile(file, "utf-8");

    totalChars += content.trim().length;
    // const charList = content.trim().split(/\s+/);
    // for (const char of charList) {
    //   totalChars += char.length;
    // }
  }
  console.log("Total characters:", totalChars);
}

if (opts.s) {
  let totalCharsNoSpaces = 0;
  for (const file of files) {
    const content = await fs.readFile(file, "utf-8");
    const withoutSpaces = content.replace(/\s/g, "");
    totalCharsNoSpaces += withoutSpaces.length;
  }
  console.log("Total characters without spaces:", totalCharsNoSpaces);
}
