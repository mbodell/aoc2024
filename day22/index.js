const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let secrets = [];
let s = [];

function mix(v, s) {
	return v ^ s;
}

function prune(s) {
	return ((s % 16777216) + 16777216) % 16777216;
}

function nextSecret(n) {
	let r = n*64;
	r = mix(r, n);
	r = prune(r);
	let s = Math.floor(r/32);
	r = mix(s, r);
	r = prune(r);
	let m = r * 2048;
	r = mix(m, r);
	r = prune(r);
	return r;
}

eachLine(filename, function(line) {
	secrets.push(parseInt(line));
}).then(function(err) {
	for(let i=0;i<secrets.length;i++) {
		s[i] = secrets[i];
	}
	for(let i=0;i<2000;i++) {
		for(let j=0;j<s.length;j++) {
			s[j]=nextSecret(s[j]);
		}
	}
	for(let i=0;i<s.length;i++) {
		answer += s[i];
		//console.log(`${secrets[i]}: ${s[i]}`);
	}
  console.log(answer);
});
