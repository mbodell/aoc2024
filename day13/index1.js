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

const COSTA = 3;
const COSTB = 1;
const MAXBUT = 101;

let state = 0;

function cheapestSolve(a, b, p) {
	let solve = false;
	let cheapSolve = MAXBUT*(COSTA+COSTB);
	for(let ba=0;ba<MAXBUT;ba++) {
		let nb = (p[0]-ba*a[0])/b[0];
		if(((a[0]*ba+b[0]*nb)===p[0]) &&
		   ((a[1]*ba+b[1]*nb)===p[1])) {
			solve = true;
			if(cheapSolve>(ba*COSTA+nb*COSTB)) {
				cheapSolve = ba*COSTA+nb*COSTB;
			 }
		}
	}
	return (solve?cheapSolve:0);
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
			prize.push([inf[0],inf[1]]);
			break;
	}
	state = (state+1)%4;
}).then(function(err) {
	for(let i=0;i<butA.length;i++) {
		answer += cheapestSolve(butA[i],butB[i],prize[i]);
	}
  console.log(answer);
});
