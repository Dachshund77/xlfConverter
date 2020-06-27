var xlf2sheet = require("./lib/xlf2sheet.js")
var sheet2xlf = require("./lib/sheet2xlf.js")

console.log("MAIN INDEX.js");

console.debug("xlf >>> sheet")
xlf2sheet.convert("messages.en.xlf");

console.debug("sheet >>> xlf")
sheet2xlf.convert("Test.ods");