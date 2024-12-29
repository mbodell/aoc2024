const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

const GATES = 0;
const CON = 1;

let state = GATES;

let wires = [];
let gates = [];

let done = [];

function operate(ga) {
	let [l,o,r,rhs] = ga;
	if(wires[l] === undefined || wires[r] === undefined) {
		return 0;
	} else {
		switch(o) {
			case "AND":
				wires[rhs] = (wires[l]===1&&wires[r]===1)?1:0;
				break;
			case "XOR":
				wires[rhs] = ((wires[l]===1&&wires[r]===0)||(wires[l]===0&&wires[r]===1))?1:0;
				break;
			case "OR":
				wires[rhs] = (wires[l]===1||wires[r]===1)?1:0;
				break;
			default:
				console.log("got default");
				break;
		}
		return 1;
	}
}

eachLine(filename, function(line) {
	if(state === GATES) {
		if(line === "") {
			state = CON;
		} else {
			let [wire, num] = line.split(": ");
			wires[wire] = parseInt(num);
		}
	} else {
		let [lhs, rhs] = line.split(" -> ");
		let [l, o, r] = lhs.split(" ");
		gates.push([l,o,r,rhs]);
		done.push(0);
	}
}).then(function(err) {
	let d = done.reduce((a,b)=>a+b);
	while(d<gates.length) {
		for(let i=0;i<gates.length;i++) {
			if(done[i]===0) {
				done[i]=operate(gates[i]);
			}
		}
		let nd = done.reduce((a,b)=>a+b);
		if(nd===d) {
			console.log(`stopped at ${nd}`);
			d=gates.length;
		} else {
			d=nd;
		}
	}
	d = false;
	for(let i=0;!d;i++) {
		let w = "z";
		if(i<10) {
			w += "0";
		}
		w += i;
		if(wires[w]===undefined) {
			d=true;
		} else {
			answer += wires[w]*(2**i);
		}
	}
  console.log(answer);
});
