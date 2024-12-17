const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let regA = 0;
let regB = 0;
let regC = 0;
let prog = "";
let out = "";
let ip = 0;

let state=0;

function combo(op) {
	let ret = op;
	switch(op) {
		case 4:
			ret = regA;
			break;
		case 5:
			ret = regB;
			break;
		case 6:
			ret = regC;
			break;
	}
	return ret;
}

function adv(op) {
	let num = regA;
	let dem = 2**combo(op);
	return Math.floor(num/dem);
}

function runProgram() {
	while(ip<prog.length) {
		let op = prog[ip+1];
		switch(prog[ip]) {
			case 0: /* adv */
				regA = adv(op);
				break;
			case 1: /* bxl */
				regB = regB ^ op;
				break;
			case 2: /* bst */
				regB = combo(op)%8;
				break;
			case 3: /* jnz */
				if(regA!==0) {
					ip = op - 2;
				}
				break;
			case 4: /* bxc */
				regB = regB ^ regC;
				break;
			case 5: /* out */
				let o = combo(op)%8;
				if(out!=="") {
					out += ',';
				}
				out += o;
				break;
			case 6: /* bdv */
				regB = adv(op);
				break;
			case 7: /* cdv */
				regC = adv(op);
				break;
		}
		ip += 2;
	}
	return out;
}

eachLine(filename, function(line) {
	switch(state) {
		case 0:
			regA = parseInt(line.split(': ')[1]);
			break;
		case 1:
			regB = parseInt(line.split(': ')[1]);
			break;
		case 2:
			regC = parseInt(line.split(': ')[1]);
			break;
		case 3:
			break;
		case 4:
			prog = line.split(': ')[1].split(',').map((x)=>parseInt(x));
			break;
	}
	state++;
}).then(function(err) {
	console.log(`regA = ${regA};regB = ${regB};regC = ${regC}`);
	console.log(prog);
	answer = runProgram();
  console.log(answer);
});
