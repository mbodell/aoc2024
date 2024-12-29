const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let keys = [];
let locks = [];
let next = [];
let kN = [];
let lN = [];

let start = true;
let inKey = false;
let inLock = false;

eachLine(filename, function(line) {
	if(start) {
		if(line[0]==='.') {
			inKey = true;
			inLock = false;
			next = [];
			next.push(line.split(''));
		} else {
			inKey = false;
			inLock = true;
			next = [];
			next.push(line.split(''));
		}
		start = false;
	} else if(line === "") {
		start = true;
		if(inKey) {
			keys.push(next);
		}
		if(inLock) {
			locks.push(next);
		}
	} else {
		next.push(line.split(''));
	}
}).then(function(err) {
	if(inKey) {
		keys.push(next);
	}
	if(inLock) {
		locks.push(next);
	}
	for(let i=0;i<keys.length;i++) {
		let num = [];
		for(let k=0;k<keys[i][0].length;k++) {
			let found=false;
			for(let j=keys[i].length-1;j>=0;j--) {
        if(!found && keys[i][j][k]==='.') {
					num.push(keys[i].length-j-2);
					found=true;
				}
			}
		}
		kN.push(num);
	}
	for(let i=0;i<locks.length;i++) {
		let num=[];
		for(let k=0;k<locks[i][0].length;k++) {
			let found=false;
			for(let j=0;j<locks[i].length;j++) {
				if(!found && locks[i][j][k]==='.') {
					num.push(j-1);
					found=true;
				}
			}
		}
		lN.push(num);
	}

	for(let k=0;k<kN.length;k++) {
		for(let l=0;l<lN.length;l++) {
			let valid = true;
			for(let i=0;valid&&i<kN[k].length;i++) {
				if(kN[k][i]+lN[l][i]+2>locks[0].length) {
					//console.log(`Lock ${lN[l]} and key ${kN[k]}: overlap in ${i+1} column.`);
					valid = false;
				}
			}
			if(valid) {
				//console.log(`Lock ${lN[l]} and key ${kN[k]}: all columns fit!`);
				answer++;
			}
		}
	}

  console.log(answer);
});
