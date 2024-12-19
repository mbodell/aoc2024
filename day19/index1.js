const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let state = 0;

let towels = [];
let targets = [];

let tow = [];

function build(tar) {
	let b = [];
	for(let i=0;i<=tar.length;i++) {
		b[i] = 0;
	}
	for(let i=0;i<=tar.length;i++) {
		let st = tar.substring(0,i);
		if(tow[st]) {
			b[i]++;
		}
		for(let j=1;j<i;j++) {
			let st = tar.substring(j,i);
			if(tow[st]) {
				b[i] += b[j]*tow[st];
			}
		}
	}

	return b[tar.length]; 
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
	for(let i=0;i<towels.length;i++) {
		if(tow[towels[i]]===undefined) {
			tow[towels[i]]=1;
		} else {
			tow[towels[i]]++;
		}
	}
	for(let i=0;i<targets.length;i++) {
		answer += build(targets[i]);
	}
  console.log(answer);
});
