const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let maze = [];

let paths = [];

const MOVEC = 1;
const TURNC = 1000;

const UP = 0;
const LEFT = 1;
const DOWN = 2;
const RIGHT = 3;

let start;
let end;

let vu = [];
let vl = [];
let vd = [];
let vr = [];
let fin = [];

eachLine(filename, function(line) {
	maze.push(line.split(''));
}).then(function(err) {
	for(let y=0;y<maze.length;y++) {
		vu[y] = [];
		vl[y] = [];
		vd[y] = [];
		vr[y] = [];
		fin[y] = [];
		for(let x=0;x<maze[y].length;x++) {
			if(maze[y][x]==='S') {
				start = [y,x];
			}
			if(maze[y][x]==='E') {
				end = [y,x];
			}
			vu[y][x]=0;
			vl[y][x]=0;
			vd[y][x]=0;
			vr[y][x]=0;
			fin[y][x]=0;
		}
	}
	paths.push([0,start,LEFT,""]);
	vl[start[0]][start[1]]=1;
	let solved=false;
	let can = [];
	while(paths.length>0) {
		let cur = paths.shift();
		if(cur[1][0]===end[0]&&cur[1][1]===end[1]) {
			if(!solved) {
				solved=true;
				answer = cur[0];
				can.push(cur[3]);
			} else if(cur[0]===answer) {
				can.push(cur[3]);
			}
		} else if(!solved||cur[0]<=answer) {
			switch(cur[2]) {
				case UP:
					vu[cur[1][0]][cur[1][1]]=1;
					if(maze[cur[1][0]-1][cur[1][1]]!=='#' &&
						 vu[cur[1][0]-1][cur[1][1]]===0) {
						paths.push([cur[0]+MOVEC,[cur[1][0]-1,cur[1][1]],UP,cur[3]+'^']);
					}
					if(vl[cur[1][0]][cur[1][1]]===0) {
						paths.push([cur[0]+TURNC,cur[1],LEFT,cur[3]]);
					}
					if(vr[cur[1][0]][cur[1][1]]===0) {
						paths.push([cur[0]+TURNC,cur[1],RIGHT,cur[3]]);
					}
					break;
				case LEFT:
					vl[cur[1][0]][cur[1][1]]=1;
					if(maze[cur[1][0]][cur[1][1]+1]!=='#' &&
						 vl[cur[1][0]][cur[1][1]+1]===0) {
						paths.push([cur[0]+MOVEC,[cur[1][0],cur[1][1]+1],LEFT,cur[3]+'>']);
					}
					if(vu[cur[1][0]][cur[1][1]]===0) {
						paths.push([cur[0]+TURNC,cur[1],UP,cur[3]]);
					}
					if(vd[cur[1][0]][cur[1][1]]===0) {
						paths.push([cur[0]+TURNC,cur[1],DOWN,cur[3]]);
					}
					break;
				case DOWN:
					vd[cur[1][0]][cur[1][1]]=1;
					if(maze[cur[1][0]+1][cur[1][1]]!=='#' &&
						 vd[cur[1][0]+1][cur[1][1]]===0) {
						paths.push([cur[0]+MOVEC,[cur[1][0]+1,cur[1][1]],DOWN,cur[3]+'v']);
					}
					if(vl[cur[1][0]][cur[1][1]]===0) {
						paths.push([cur[0]+TURNC,cur[1],LEFT,cur[3]]);
					}
					if(vr[cur[1][0]][cur[1][1]]===0) {
						paths.push([cur[0]+TURNC,cur[1],RIGHT,cur[3]]);
					}
					break;
				case RIGHT:
					vr[cur[1][0]][cur[1][1]]=1;
					if(maze[cur[1][0]][cur[1][1]-1]!=='#' &&
						 vr[cur[1][0]][cur[1][1]-1]===0) {
						paths.push([cur[0]+MOVEC,[cur[1][0],cur[1][1]-1],RIGHT,cur[3]+'<']);
					}
					if(vu[cur[1][0]][cur[1][1]]===0) {
						paths.push([cur[0]+TURNC,cur[1],UP,cur[3]]);
					}
					if(vd[cur[1][0]][cur[1][1]]===0) {
						paths.push([cur[0]+TURNC,cur[1],DOWN,cur[3]]);
					}
					break;
			}
			paths.sort((a,b)=>a[0]-b[0]);
		}
	}
	//console.log(can);
	for(let i=0; i<can.length;i++) {
		let y=start[0];
		let x=start[1];
		let p = can[i].split('');
		fin[y][x]=1;
		for(let j=0;j<p.length;j++) {
			switch(p[j]) {
				case '^':
					y--;
					break;
				case '>':
					x++;
					break;
				case 'v':
					y++;
					break;
				case '<':
					x--;
					break;
			}
			fin[y][x]=1;
		}
	}
	answer = fin.map((x)=>x.reduce((a,b)=>a+b)).reduce((a,b)=>a+b);
  console.log(answer);
});
