const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let inp = [];
let disk = [];

let idLength = [];

eachLine(filename, function(line) {
	inp = line.split('').map((x)=>parseInt(x));
}).then(function(err) {
	let id = 0;
	for(let d=0;d<inp.length;d++) {
		if(d%2===0) {
			for(let f=0;f<inp[d];f++) {
				disk.push(id);
			}
			idLength[id]=inp[d];
			id++;
		} else {
			for(let s=0;s<inp[d];s++) {
				disk.push('.');
			}
		}
	}
	for(let end=disk.length-1;end>0;end--) {
		let swap = false;
		let dots = 0;
		for(let p=0;disk[end]!=='.'&&p<end&&!swap;p++) {
			if(disk[p]!=='.') {
				dots = 0;
			} else {
				dots++;
				if(dots===idLength[disk[end]]) {
					for(let t=0;t<dots;t++) {
						let temp = disk[end-t];
						disk[end-t] = disk[p-t];
						disk[p-t] = temp;
					}
					swap=true;
				}
			}
		}
	}
	for(let i=0;i<disk.length;i++) {
		if(disk[i]!=='.') {
			answer += i*disk[i];
		}
	}
  console.log(answer);
});
