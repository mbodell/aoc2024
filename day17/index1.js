const lineReader = require("line-reader");
const Promise = require('bluebird');

/* 314100000000 and going, negative after 274800000000 */
/* 109685330781408 is the answer when doing diff way */

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let regA = 0;
let regB = 0;
let orB = 0;
let regC = 0;
let orC = 0;
let prog = "";
let out = "";
let ip = 0;
let tar = "";

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
				if(regB<0) {
					regB+=8;
				}
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
				if(o<0) {
					o+=8;
				}
				if(out!=="") {
					out += ',';
				}
				out += o.toString();
				if(!tar.startsWith(out)) {
					// not equal so bail
					ip = prog.length;
				}
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
			orB = regB;
			break;
		case 2:
			regC = parseInt(line.split(': ')[1]);
			orC = regC;
			break;
		case 3:
			break;
		case 4:
			prog = line.split(': ')[1].split(',').map((x)=>parseInt(x));
			tar = line.split(': ')[1];
			break;
	}
	state++;
}).then(function(err) {
	console.log(`regA = ${regA};regB = ${regB};regC = ${regC}`);
	console.log(`target = ${tar}`);
	console.log(prog);
	let diff = [];
	diff.push(5);
	diff.push(160258754);
	diff.push(33554432);
	diff.push(33554432);
	diff.push(33554432);
	diff.push(7513401);
	diff.push(5);
	diff.push(268435451);
	diff.push(5);
	diff.push(268435451);
	diff.push(5);
	diff.push(268435451);
	let j=0;
	for(let i=262162969;out!==tar;) {
		answer = i;
		regA = i;
		regB = orB;
		regC = orC;
		out = "";
		ip = 0;
		out=runProgram();
		if((answer % 100000000) === 0) {
			console.log(`On run ${answer} we had output ${out}`);
		}
		if(out.length>25) {
			console.log(`On run ${answer} we had output ${out}`);
		}
		i += diff[j];
		j++;
		j = j % diff.length;
	}
  console.log(answer);
});
