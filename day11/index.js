const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let stones = [];

function blink(arr, num) {
	let st = [];
	if(num===0) {
		return arr.length;
	}
	for(let i=0;i<arr.length;i++) {
		if(arr[i]===0) {
			st.push(1);
		} else if(arr[i].toString().length%2===0) {
			let len = arr[i].toString().length/2;
			let s1 = parseInt(arr[i].toString().substr(0,len));
			let s2 = parseInt(arr[i].toString().substr(len));
			st.push(s1);
			st.push(s2);
		} else {
			st.push(arr[i]*2024);
		}
	}
	return blink(st, num-1);
}

eachLine(filename, function(line) {
	stones = line.split(' ').map((x)=>parseInt(x));
}).then(function(err) {
	answer = blink(stones, 25);
  console.log(answer);
});
