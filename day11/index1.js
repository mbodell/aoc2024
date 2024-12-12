const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let stones = [];

function blink(arr, set, num) {
	let st = [];
	let stSet = new Set();
	if(num===0) {
		let total = 0;
		for(const entry of set) {
			total += arr[entry];
		}
		return total;
	}
	for(const ent of set) {
		if(ent===0) {
			if(!stSet.has(1)) {
				st[1] = 0;
			}
			stSet.add(1);
			st[1] += arr[ent];
		} else if(ent.toString().length%2===0) {
			let len = ent.toString().length/2;
			let s1 = parseInt(ent.toString().substr(0,len));
			let s2 = parseInt(ent.toString().substr(len));
			if(!stSet.has(s1)) {
				st[s1] = 0;
			}
			stSet.add(s1);
			st[s1] += arr[ent];
			if(!stSet.has(s2)) {
				st[s2] = 0;
			}
			stSet.add(s2);
			st[s2] += arr[ent];
		} else {
			let s1 = ent*2024;
			if(!stSet.has(s1)) {
				st[s1] = 0;
			}
			stSet.add(s1);
			st[s1] += arr[ent];
		}
	}
	return blink(st, stSet, num-1);
}

eachLine(filename, function(line) {
	stones = line.split(' ').map((x)=>parseInt(x));
}).then(function(err) {
	let stSet = new Set();
	let st = [];
	stones.map((x)=>(stSet.add(x),((st[x]===undefined)?st[x]=1:st[x]++)));
	answer = blink(st, stSet, 75);
  console.log(answer);
});
