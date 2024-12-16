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

eachLine(filename, function(line) {
	maze.push(line.split(''));
}).then(function(err) {
	for(let y=0;y<maze.length;y++) {
		vu[y] = [];
		vl[y] = [];
		vd[y] = [];
		vr[y] = [];
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
		}
	}
	paths.push([0,start,LEFT]);
	vl[start[0]][start[1]]=1;
	let solved=false;
	while(!solved&&paths.length>0) {
		let cur = paths.shift();
		if(cur[1][0]===end[0]&&cur[1][1]===end[1]) {
			solved=true;
			answer = cur[0];
		} else {
			switch(cur[2]) {
				case UP:
					vu[cur[1][0]][cur[1][1]]=1;
					if(maze[cur[1][0]-1][cur[1][1]]!=='#' &&
						 vu[cur[1][0]-1][cur[1][1]]===0) {
						paths.push([cur[0]+MOVEC,[cur[1][0]-1,cur[1][1]],UP]);
					}
					if(vl[cur[1][0]][cur[1][1]]===0) {
						paths.push([cur[0]+TURNC,cur[1],LEFT]);
					}
					if(vr[cur[1][0]][cur[1][1]]===0) {
						paths.push([cur[0]+TURNC,cur[1],RIGHT]);
					}
					break;
				case LEFT:
					vl[cur[1][0]][cur[1][1]]=1;
					if(maze[cur[1][0]][cur[1][1]+1]!=='#' &&
						 vl[cur[1][0]][cur[1][1]+1]===0) {
						paths.push([cur[0]+MOVEC,[cur[1][0],cur[1][1]+1],LEFT]);
					}
					if(vu[cur[1][0]][cur[1][1]]===0) {
						paths.push([cur[0]+TURNC,cur[1],UP]);
					}
					if(vd[cur[1][0]][cur[1][1]]===0) {
						paths.push([cur[0]+TURNC,cur[1],DOWN]);
					}
					break;
				case DOWN:
					vd[cur[1][0]][cur[1][1]]=1;
					if(maze[cur[1][0]+1][cur[1][1]]!=='#' &&
						 vd[cur[1][0]+1][cur[1][1]]===0) {
						paths.push([cur[0]+MOVEC,[cur[1][0]+1,cur[1][1]],DOWN]);
					}
					if(vl[cur[1][0]][cur[1][1]]===0) {
						paths.push([cur[0]+TURNC,cur[1],LEFT]);
					}
					if(vr[cur[1][0]][cur[1][1]]===0) {
						paths.push([cur[0]+TURNC,cur[1],RIGHT]);
					}
					break;
				case RIGHT:
					vr[cur[1][0]][cur[1][1]]=1;
					if(maze[cur[1][0]][cur[1][1]-1]!=='#' &&
						 vr[cur[1][0]][cur[1][1]-1]===0) {
						paths.push([cur[0]+MOVEC,[cur[1][0],cur[1][1]-1],RIGHT]);
					}
					if(vu[cur[1][0]][cur[1][1]]===0) {
						paths.push([cur[0]+TURNC,cur[1],UP]);
					}
					if(vd[cur[1][0]][cur[1][1]]===0) {
						paths.push([cur[0]+TURNC,cur[1],DOWN]);
					}
					break;
			}
			paths.sort((a,b)=>a[0]-b[0]);
		}
	}
  console.log(answer);
});
