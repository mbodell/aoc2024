const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

const NUMSEC=100;
/*
const MAXX = 11;
const MAXY = 7;
*/
const MAXX = 101;
const MAXY = 103;

let robot = [];

let q1=0;
let q2=0;
let q3=0;
let q4=0;

function calcPos(pos,vel) {
	let x = (pos[0]+NUMSEC*vel[0])%MAXX;
	let y = (pos[1]+NUMSEC*vel[1])%MAXY;
	if(x<0) {
		x+=MAXX;
	}
	if(y<0) {
		y+=MAXY;
	}
	if(x<Math.floor(MAXX/2)) {
		if(y<Math.floor(MAXY/2)) {
			q1++;
		} else if(y>MAXY/2) {
			q3++;
		}
	} else if(x>MAXX/2) {
		if(y<Math.floor(MAXY/2)) {
			q2++;
		} else if(y>MAXY/2) {
			q4++;
		}
	} else if(x>MAXX/2) {
	}
	//console.log(`x is ${x} and y is ${y} and (${q1},${q2},${q3},${q4})`);
}

eachLine(filename, function(line) {
	let p = line.split(' ');
	let pos = p[0].split('=')[1].split(',').map((x)=>parseInt(x));
	let vel = p[1].split('=')[1].split(',').map((x)=>parseInt(x));
	robot.push([pos,vel]);
}).then(function(err) {
	for(let i=0;i<robot.length;i++) {
		calcPos(robot[i][0],robot[i][1]);
	}
	answer = q1*q2*q3*q4;
  console.log(answer);
});
