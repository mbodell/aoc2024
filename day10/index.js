const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let tmap = [];

eachLine(filename, function(line) {
	tmap.push(line.split('').map((x)=>parseInt(x)));
}).then(function(err) {
	console.log(tmap);
  console.log(answer);
});
