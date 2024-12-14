const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let butA = [];
let butB = [];
let prize = [];

const BUTTA = 0;
const BUTTB = 1;
const PRIZE = 2;
const LINE = 3;

const EXTRA = 10000000000000;

const COSTA = 3;
const COSTB = 1;

let state = 0;

function cheapestSolve(a, b, p) {
	let cheapSolve = 0;
	let delt = a[0]*b[1]-a[1]*b[0];
	let deltX = p[0]*b[1]-p[1]*b[0];
	let deltY = a[0]*p[1]-a[1]*p[0];
	let ba = Math.floor(deltX/delt);
	let nb = Math.floor(deltY/delt);
	if(((a[0]*ba+b[0]*nb)===p[0]) &&
		((a[1]*ba+b[1]*nb)===p[1])) {
		cheapSolve = ba*COSTA+nb*COSTB;
		//console.log(`We solved ${p} with ${a} and ${b} due to ${ba} a button presses and ${nb} b button presses for ${cheapSolve} for the cheap solve.`);
	}
	return cheapSolve;
}

eachLine(filename, function(line) {
	let inf;
	switch(state) {
		case BUTTA:
		case BUTTB:
			inf = line.split(': ')[1].split(', ').map((x)=>parseInt(x.split('+')[1]));
			if(state===BUTTA) {
				butA.push([inf[0],inf[1]]);
			} else {
				butB.push([inf[0],inf[1]]);
			}
			break;
		case PRIZE:
			inf = line.split(': ')[1].split(', ').map((x)=>parseInt(x.split('=')[1]));
			prize.push([EXTRA+inf[0],EXTRA+inf[1]]);
			break;
	}
	state = (state+1)%4;
}).then(function(err) {
	for(let i=0;i<butA.length;i++) {
		answer += cheapestSolve(butA[i],butB[i],prize[i]);
	}
  console.log(answer);
});
