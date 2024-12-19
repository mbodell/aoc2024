const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let state = 0;

let towels = [];
let targets = [];

function build(tar) {
	let match = 0;
	let ip = [];
	ip.push("");
	while(ip.length>0) {
		let cur = ip.shift();
		if(cur===tar) {
			match++;
		} else {
			for(let i=0;i<towels.length;i++) {
				let c = cur+towels[i];
				if(tar.startsWith(c)) {
					ip.push(c);
				}
			}
		}
	}
	return match;
}

eachLine(filename, function(line) {
	if(state===0) {
		towels = line.split(", ");
		state++;
	} else if(state===1) {
		state++;
	} else {
		targets.push(line);
	}
}).then(function(err) {
	for(let i=0;i<targets.length;i++) {
		answer += build(targets[i]);
	}
  console.log(answer);
});
