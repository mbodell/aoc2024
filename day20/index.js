const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let map = [];

let start = [];
let end = [];

function solveMap() {
	let visit = [];
	let ret = 0;
	for(let y=0;y<map.length;y++) {
		visit[y] = [];
		for(let x=0;x<map[y].length;x++) {
			visit[y][x]=0;
		}
	}
	let path = [];
	path.push([0,start]);
	let solve = false;
	while(!solve && path.length>0) {
		let cur = path.shift();
		let ty = cur[1][0];
		let tx = cur[1][1];
		if(ty===end[0]&&tx===end[1]) {
			solve = true;
			ret = cur[0];
		} else {
			visit[ty][tx]=1;
			if(map[ty-1][tx]!=='#'&&visit[ty-1][tx]===0) {
				path.push([cur[0]+1,[ty-1,tx]]);
			}
			if(map[ty+1][tx]!=='#'&&visit[ty+1][tx]===0) {
				path.push([cur[0]+1,[ty+1,tx]]);
			}
			if(map[ty][tx-1]!=='#'&&visit[ty][tx-1]===0) {
				path.push([cur[0]+1,[ty,tx-1]]);
			}
			if(map[ty][tx+1]!=='#'&&visit[ty][tx+1]===0) {
				path.push([cur[0]+1,[ty,tx+1]]);
			}
		}
	}
	return ret;
}

eachLine(filename, function(line) {
	map.push(line.split(''));
}).then(function(err) {
	for(let y=0;y<map.length;y++) {
		for(let x=0;x<map[y].length;x++) {
			if(map[y][x]==='S') {
				start = [y,x];
			}
			if(map[y][x]==='E') {
				end = [y,x];
			}
		}
	}
	let noCheat = solveMap();
	let save100 = 0;
	let savings = [];
	for(let y=1;y<map.length-1;y++) {
		for(let x=1;x<map[y].length-1;x++) {
			if(map[y][x]==='#') {
				map[y][x]='.';
				let count=solveMap();
				map[y][x]='#';
				let diff = noCheat-count;
				if(diff>=100) {
					save100++;
				}
				//console.log(`If cheat is (${y},${x}) we'd do ${count} which is a save of ${diff}`);
				if(savings[diff]===undefined) {
					savings[diff] = 1;
				} else {
					savings[diff]++;
				}
			}
		}
	}
	console.log(noCheat);
	answer = save100;
	//console.log(savings);
  console.log(answer);
});
