const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let inp = [];
let disk = [];

eachLine(filename, function(line) {
	inp = line.split('').map((x)=>parseInt(x));
}).then(function(err) {
	let id = 0;
	for(let d=0;d<inp.length;d++) {
		if(d%2===0) {
			for(let f=0;f<inp[d];f++) {
				disk.push(id);
			}
			id++;
		} else {
			for(let s=0;s<inp[d];s++) {
				disk.push('.');
			}
		}
	}
	let end=disk.length-1;
	for(let d=0;d<disk.length&&d<end;d++) {
		if(disk[d]==='.') {
			while(end>d&&disk[end]==='.') {
				end--;
			}
			if(d<end) {
				let temp = disk[d];
				disk[d] = disk[end];
				disk[end] = temp;
			}
		}
		if(disk[d]!=='.') {
			answer += disk[d]*d;
		}
	}
  console.log(answer);
});
