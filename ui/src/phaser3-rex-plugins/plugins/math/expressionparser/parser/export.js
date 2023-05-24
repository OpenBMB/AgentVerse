var fs = require('fs');
var jison = require("jison");

console.log("In progress...");

var parser = new jison.Parser(fs.readFileSync("grammar.jison", "utf8"));

// generate source, ready to be written to disk
var parserSource = parser.generate();
// console.log('Source: ', parserSource)

var replaceSource = `if (typeof module !== 'undefined' && require.main === module) {`
var replacedBy = `if (0) {  // Ignore 'require.main'`
parserSource = parserSource.replace(replaceSource, replacedBy);

var replaceSource = `exports.main(process.argv.slice(1));`
var replacedBy = `//exports.main(process.argv.slice(1));`
parserSource = parserSource.replace(replaceSource, replacedBy);

try {
	fs.writeFileSync("./parser.js", parserSource)
	//file written successfully
	console.log("Ok. The file parser was saved!");
} catch (err) {
	console.error(err)
}