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

let highZ = 0;

let swapN = new Set();
let swapW = [];

function swap(a, b) {
	swapN.add(a);
	swapN.add(b);
	swapW[a] = b;
	swapW[b] = a;
}

swap("gjc", "qjj");
swap("z17", "wmp");
swap("z26", "gvm");
swap("z39", "qsb");

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

function runComp() {
	let done = new Array(gates.length).fill(0);
	let d = done.reduce((a,b)=>a+b);
	let ret = 0;
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
			ret += wires[w]*(2**i);
		}
	}
	return ret;
}

function testAdd(x,y) {
	let an = x+y;
	wires = [];
	setWire("x", x);
	setWire("y", y);
	let ans = runComp();
	let ret = ans === an;
	if(ret===false) {
		console.log(`We got ${ret} for testing ${x}+${y} when we got ${ans} and expected ${an}`);
	}
	return ret;
}

function setWire(wire, n) {
	for(let i=0;i<=highZ;i++) {
		let w=wire;
		if(i<10) {
			w+="0";
		}
		w+=i;
		wires[w] = n % 2;
		n -= wires[w];
		n /= 2;
	}
}

function printWOnes(wires) {
	for(let i=0;i<highZ;i++) {
		let w = wires;
		if(i<10) {
			w+="0";
		}
		w+=i;
		console.log(`in pWO with ${w} and ${i} and ${wires[w]}`);
		if(wires[w]===1) {
			console.log(`${w} is set to 1`);
		}
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
		gates.push([l,o,r,swapN.has(rhs)?swapW[rhs]:rhs]);
		done.push(0);
		if(rhs[0]==='z') {
			let n = parseInt(rhs[2])+10*parseInt(rhs[1]);
			if(n>highZ) {
				highZ = n;
			}
		}
	}
}).then(function(err) {
	answer = runComp();
	let num=4;
	for(let k=0;k<highZ-1;k++) {
		for(let i=0;i<num;i++) {
			for(let j=0;j<num;j++) {
				if(testAdd(i*(2**k),j*(2**k))===false) {
					console.log(`false with k${k},i${i},j${j}`);
					//printWOnes("z");
				}
			}
		}
	}
	answer = [...swapN].sort().reduce((a,b)=>a+","+b);
	console.log(answer);
});
