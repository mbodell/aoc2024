const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let room = [];
const ROOM = 0;
const DIRECTIONS = 1;
let dir = "";
let state = ROOM;

const UP = '^';
const DOWN = 'v';
const RIGHT = '>';
const LEFT = '<';

const YCOST = 100;
const XCOST = 1;

let loc;

function printRoom() {
	console.log(room.map((x)=>x.reduce((a,b)=>a+b)));
}

function calcCost() {
	let ret = 0;
	for(let y=0;y<room.length;y++) {
		for(let x=0;x<room[y].length;x++) {
			if(room[y][x]==='O') {
				ret += y*YCOST+x*XCOST;
			}
		}
	}
	return ret;
}

function moveUp(y,x) {
	let ey = y;
	let done = false;
	while(!done&&ey>0) {
		switch(room[ey-1][x]) {
			case '.':
				done=true;
				for(let my=ey-1;my<y;my++) {
					room[my][x] = room[my+1][x];
				}
				room[y][x]='.';
				loc=[y-1,x];
				break;
			case 'O':
				ey--;
				break;
			case '#':
				done=true;
				break;
		}
	}
}

function moveDown(y,x) {
	let ey = y;
	let done = false;
	while(!done) {
		switch(room[ey+1][x]) {
			case '.':
				done=true;
				for(let my=ey+1;my>y;my--) {
					room[my][x] = room[my-1][x];
				}
				room[y][x]='.';
				loc=[y+1,x];
				break;
			case 'O':
				ey++;
				break;
			case '#':
				done=true;
				break;
		}
	}
}

function moveLeft(y,x) {
	let ex = x;
	let done = false;
	while(!done) {
		switch(room[y][ex-1]) {
			case '.':
				done=true;
				for(let mx=ex-1;mx<x;mx++) {
					room[y][mx] = room[y][mx+1];
				}
				room[y][x]='.';
				loc=[y,x-1];
				break;
			case 'O':
				ex--;
				break;
			case '#':
				done=true;
				break;
		}
	}
}

function moveRight(y,x) {
	let ex = x;
	let done = false;
	while(!done) {
		switch(room[y][ex+1]) {
			case '.':
				done=true;
				for(let mx=ex+1;mx>x;mx--) {
					room[y][mx] = room[y][mx-1];
				}
				room[y][x]='.';
				loc=[y,x+1];
				break;
			case 'O':
				ex++;
				break;
			case '#':
				done=true;
				break;
		}
	}
}

eachLine(filename, function(line) {
	if(state === ROOM) {
		if(line.length===0) {
			state = DIRECTIONS;
		} else {
			room.push(line.split(''));
		}
	} else {
		dir += line;
	}
}).then(function(err) {
	dir=dir.split('');
	for(let y=0;y<room.length;y++) {
		for(let x=0;x<room[y].length;x++) {
			if(room[y][x]==='@') {
				loc = [y,x];
			}
		}
	}

	for(let i=0;i<dir.length;i++) {
		/*
		console.log(`Move ${dir[i]}:`);
		printRoom();
		*/
		switch(dir[i]) {
			case UP:
				moveUp(loc[0],loc[1]);
				break;
			case DOWN:
				moveDown(loc[0],loc[1]);
				break;
			case LEFT:
				moveLeft(loc[0],loc[1]);
				break;
			case RIGHT:
				moveRight(loc[0],loc[1]);
				break;
		}
	}

	answer = calcCost();

  console.log(answer);
});
