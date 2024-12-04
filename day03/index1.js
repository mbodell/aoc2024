const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;
let terms = [];

let enable = true;

eachLine(filename, function(line) {
	let done=false;
	let s=0;
	while(!done) {
		if(!enable) {
			let t = line.indexOf("do()",s);
			if(t === -1) {
				done=true;
				line = line.slice(0,s);
			} else {
				line = line.slice(0,s) + line.slice(t+1);
				enable = true;
			}
		} else {
			let t = line.indexOf("don't()",s);
			if(t === -1) {
				done=true;
			} else {
				s=t+1;
				enable = false;
			}
		}
	}
	let term = line.match(/mul\(\d{1,3},\d{1,3}\)/g);
	terms.push(term);
	answer += term.map((x)=>x.match(/\d+/g).reduce((a,b)=>parseInt(a)*parseInt(b))).reduce((a,b)=>a+b);
}).then(function(err) {
  console.log(answer);
});
