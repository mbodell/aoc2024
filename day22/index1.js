const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let secrets = [];
let s = [];

let deltas = [];

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

function changeO(a, b) {
	return (a%10)-(b%10);
}

function calcChange(m) {
	let d = [];
	for(let i=1;i<m.length;i++) {
		d.push(changeO(m[i],m[i-1]));
	}
	return d;
}

function findBan(a,b,c,d) {
	let ban = 0;
	for(let i=0;i<deltas.length;i++) {
		let found = false;
		for(let j=3;!found&&j<deltas[i].length;j++) {
			if(a===deltas[i][j-3]&&
				 b===deltas[i][j-2]&&
				 c===deltas[i][j-1]&&
				 d===deltas[i][j]) {
				found=true;
				let ba = s[i][j+1]%10;
				ban += ba;
				//console.log(`On ${secrets[i]} there are ${ba} bananas which make ${ban} total so far when (${a},${b},${c},${d}) is used`);
			}
		}
	}
	return ban;
}

eachLine(filename, function(line) {
	secrets.push(parseInt(line));
}).then(function(err) {
	for(let i=0;i<secrets.length;i++) {
		s[i] = [];
		s[i].push(secrets[i]);
	}
	for(let i=0;i<2000;i++) {
		for(let j=0;j<s.length;j++) {
			s[j].push(nextSecret(s[j][i]));
		}
	}
	for(let i=0;i<s.length;i++) {
		deltas.push(calcChange(s[i]));
	}

	let maxB = 0;
	let num = [];
	for(let a=-9;a<=9;a++) {
		for(let b=-9;b<=9;b++) {
			for(let c=-9;c<=9;c++) {
				for(let d=-9;d<=9;d++) {
					let ban = findBan(a,b,c,d);
					if(ban>maxB) {
						maxB = ban;
						num = [a,b,c,d];
						console.log(`There are ${maxB} bananas with (${a},${b},${c},${d})`);
					}
				}
			}
		}
	}
	answer = maxB;

  console.log(answer);
});
