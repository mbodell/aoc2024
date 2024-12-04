const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;
let terms = [];

eachLine(filename, function(line) {
	let term = line.match(/mul\(\d{1,3},\d{1,3}\)/g);
	terms.push(term);
	answer += term.map((x)=>x.match(/\d+/g).reduce((a,b)=>parseInt(a)*parseInt(b))).reduce((a,b)=>a+b);
}).then(function(err) {
  console.log(answer);
});
