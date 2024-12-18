const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

/* example
const GRID=7;
const HIT=12;
/**/
const GRID=71;
const HIT=1024;

let inp=[];
let map=[];
let visit=[];

function solvePath() {
	let paths = [];
	paths.push([0,[0,0]]);
	let solve = false;
	while(!solve&&paths.length>0) {
		let cur = paths.shift();
		let y = cur[1][0];
		let x = cur[1][1];
		if((y===(GRID-1))&&(x===(GRID-1))) {
			solve = true;
			answer = cur[0];
		} else if(visit[y][x]===0) {
			visit[y][x] = 1;
			if(y>0) {
				let np = visit[y-1][x];
				if(np===0 && map[y-1][x]!=='#') {
					paths.push([cur[0]+1,[y-1,x]]);
				}
			}
			if(y+1<GRID) {
				let np = visit[y+1][x];
				if(np===0 && map[y+1][x]!=='#') {
					paths.push([cur[0]+1,[y+1,x]]);
				}
			}
			if(x>0) {
				let np = visit[y][x-1];
				if(np===0 && map[y][x-1]!=='#') {
					paths.push([cur[0]+1,[y,x-1]]);
				}
			}
			if(x+1<GRID) {
				let np = visit[y][x+1];
				if(np===0 && map[y][x+1]!=='#') {
					paths.push([cur[0]+1,[y,x+1]]);
				}
			}
		}
	}
	return solve;
}

eachLine(filename, function(line) {
	inp.push(line.split(',').map((x)=>parseInt(x)));
}).then(function(err) {
	let solve = true;
	for(let h=HIT;solve&&h<inp.length;h++) {

		for(let y=0; y<GRID; y++) {
			map[y] = [];
			visit[y] = [];
			for(let x=0; x<GRID; x++) {
				map[y][x] = '.';
				visit[y][x] = 0;
			}
		}
		for(let i=0;i<h;i++) {
			map[inp[i][1]][inp[i][0]] = '#';
		}
		solve=solvePath();
		if(!solve) {
			answer = inp[h-1][0].toString() + ',' + inp[h-1][1].toString();
		}
	}

	console.log(answer);
});
