const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let initRoom = [];

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
			if(room[y][x]==='[') {
				ret += y*YCOST+x*XCOST;
			}
		}
	}
	return ret;
}

function moveUp(y,x) {
	let valid = true;
	let toConsider = [];
	let toMove = [];
	let dup=false;

	toConsider.push([y,x,room[y][x]]);

	while(valid&&toConsider.length>0) {
		let cur = toConsider.shift();
		switch(room[cur[0]-1][cur[1]]) {
			case '.':
				dup = false;
				for(let i=0;!dup&&i<toMove.length;i++) {
					if(cur[0]===toMove[i][0] && cur[1]===toMove[i][1]) {
						dup = true;
					}
				}
				if(!dup) {
					toMove.push(cur);
				}
				break;
			case '#':
				valid = false;
				break;
			case '[':
				dup = false;
				for(let i=0;!dup&&i<toMove.length;i++) {
					if(cur[0]===toMove[i][0] && cur[1]===toMove[i][1]) {
						dup = true;
					}
				}
				if(!dup) {
					toMove.push(cur);
				}
				toConsider.push([cur[0]-1,cur[1],'[']);
				toConsider.push([cur[0]-1,cur[1]+1,']']);
				break;
			case ']':
				dup = false;
				for(let i=0;!dup&&i<toMove.length;i++) {
					if(cur[0]===toMove[i][0] && cur[1]===toMove[i][1]) {
						dup = true;
					}
				}
				if(!dup) {
					toMove.push(cur);
				}
				toConsider.push([cur[0]-1,cur[1],']']);
				toConsider.push([cur[0]-1,cur[1]-1,'[']);
				break;
		}
	}

	if(valid) {
		for(let cy=0;cy<room.length;cy++) {
			for(let i=0;i<toMove.length;i++) {
				if(toMove[i][0]===cy) {
					let cx = toMove[i][1];
					let tmp = room[cy-1][cx];
					room[cy-1][cx] = room[cy][cx];
					room[cy][cx] = tmp;
				}
			}
		}
		loc=[y-1,x];
	}
}

function moveDown(y,x) {
	let valid = true;
	let toConsider = [];
	let toMove = [];
	let dup=false;

	toConsider.push([y,x,room[y][x]]);

	while(valid&&toConsider.length>0) {
		let cur = toConsider.shift();
		switch(room[cur[0]+1][cur[1]]) {
			case '.':
				dup = false;
				for(let i=0;!dup&&i<toMove.length;i++) {
					if(cur[0]===toMove[i][0] && cur[1]===toMove[i][1]) {
						dup = true;
					}
				}
				if(!dup) {
					toMove.push(cur);
				}
				break;
			case '#':
				valid = false;
				break;
			case '[':
				dup = false;
				for(let i=0;!dup&&i<toMove.length;i++) {
					if(cur[0]===toMove[i][0] && cur[1]===toMove[i][1]) {
						dup = true;
					}
				}
				if(!dup) {
					toMove.push(cur);
				}
				toConsider.push([cur[0]+1,cur[1],'[']);
				toConsider.push([cur[0]+1,cur[1]+1,']']);
				break;
			case ']':
				dup = false;
				for(let i=0;!dup&&i<toMove.length;i++) {
					if(cur[0]===toMove[i][0] && cur[1]===toMove[i][1]) {
						dup = true;
					}
				}
				if(!dup) {
					toMove.push(cur);
				}
				toConsider.push([cur[0]+1,cur[1],']']);
				toConsider.push([cur[0]+1,cur[1]-1,'[']);
				break;
		}
	}

	if(valid) {
		for(let cy=room.length;cy>0;cy--) {
			for(let i=0;i<toMove.length;i++) {
				if(toMove[i][0]===cy) {
					let cx = toMove[i][1];
					let tmp = room[cy+1][cx];
					room[cy+1][cx] = room[cy][cx];
					room[cy][cx] = tmp;
				}
			}
		}
		loc=[y+1,x];
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
			case '[':
			case ']':
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
			case '[':
			case ']':
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
			initRoom.push(line.split(''));
		}
	} else {
		dir += line;
	}
}).then(function(err) {
	for(let y=0;y<initRoom.length;y++) {
		room[y] = [];
		for(let x=0;x<initRoom[y].length;x++) {
			switch(initRoom[y][x]) {
				case '#':
					room[y].push('#');
					room[y].push('#');
					break;
				case 'O':
					room[y].push('[');
					room[y].push(']');
					break;
				case '.':
					room[y].push('.');
					room[y].push('.');
					break;
				case '@':
					room[y].push('@');
					room[y].push('.');
					break;
			}
		}
	}
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
		printRoom();
		console.log(`Move ${dir[i]}:`);
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

	//printRoom();

  console.log(answer);
});
