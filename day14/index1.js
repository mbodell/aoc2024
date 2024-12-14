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

let curRobot = [];

function advanceStep() {
	for(let i=0;i<robot.length;i++) {
		curRobot[i][0] = (curRobot[i][0]+robot[i][1][0])%MAXX;
		curRobot[i][1] = (curRobot[i][1]+robot[i][1][1])%MAXY;
		if(curRobot[i][0]<0) {
			curRobot[i][0]+=MAXX;
		}
		if(curRobot[i][1]<0) {
			curRobot[i][1]+=MAXY;
		}
	}
}

function plotRobots(num) {
	let pict = [];
	for(let y=0;y<MAXY;y++) {
		pict[y] = [];
		for(let x=0;x<MAXX;x++) {
			pict[y][x] = 0;
		}
	}
	for(let i=0;i<curRobot.length;i++) {
		pict[curRobot[i][1]][curRobot[i][0]]++;
	}
	let maxCon = 0;
	for(let y=0;y<MAXY;y++) {
		let run = false;
		let curRun = 0;
		for(let x=0;x<MAXX;x++) {
			if(pict[y][x]>0) {
				if(!run) {
					run = true;
			  }
				curRun++;
			} else {
				if(curRun>maxCon) {
					maxCon = curRun;
				}
				run = false;
				curRun = 0;
			}
		}
		if(curRun>maxCon) {
			maxCon = curRun;
		}
	}
	if(maxCon>10) {
		console.log(pict.map((x)=>x.reduce((a,b)=>a.toString()+b.toString())));
		return true;
	} else {
		return false;
	}
}

eachLine(filename, function(line) {
	let p = line.split(' ');
	let pos = p[0].split('=')[1].split(',').map((x)=>parseInt(x));
	let vel = p[1].split('=')[1].split(',').map((x)=>parseInt(x));
	robot.push([pos,vel]);
}).then(function(err) {
	for(let i=0;i<robot.length;i++) {
		curRobot[i]=robot[i][0];
	}
	for(let i=0;i<MAXX*MAXY;i++) {
		if(plotRobots(i)) {
			answer = i;
		}
		advanceStep();
	}

  console.log(answer);
});
