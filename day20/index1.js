const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let map = [];

let start = [];
let end = [];

let smap = [];
let emap = [];

function solveMap(csy,csx,cey,cex,cl) {
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
	let usedC = false;
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
			if(ty===csy&&tx===csx&&visit[cey][cex]===0) {
				usedC=true;
				path.push([cur[0]+cl,[cey,cex]]);
			}
			if(usedC===true) {
				path.sort((a,b)=>a[0]-b[0]);
			}
		}
	}
	return ret;
}

function calcCheats(csy,csx) {
	let fin = [];
	for(let y=0;y<map.length;y++) {
		for(let x=0;x<map[y].length;x++) {
			let diff = Math.abs(csy-y)+Math.abs(csx-x);
			if(map[y][x]!=='#' && diff<=20) {
				fin.push([[y,x],diff]);
			}
		}
	}
	return fin;
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
	let noCheat = solveMap(0,0,0,0,0);

	let rstart = start;
	let rend = end;

	for(let y=0;y<map.length;y++) {
		smap[y] = [];
		for(let x=0;x<map[y].length;x++) {
			if(map[y][x]!=='#') {
				end = [y,x];
				smap[y][x] = solveMap(0,0,0,0,0);
			}
		}
	}
	end = rend;
	for(let y=0;y<map.length;y++) {
		emap[y] = [];
		for(let x=0;x<map[y].length;x++) {
			if(map[y][x]!=='#') {
				start = [y,x];
				emap[y][x] = solveMap(0,0,0,0,0);
			}
		}
	}
	start = rstart;

	let save100 = 0;
	let savings = [];
	for(let y=1;y<map.length-1;y++) {
		for(let x=1;x<map[y].length-1;x++) {
			if(map[y][x]!=='#') {
				let cheats = calcCheats(y,x);
				for(let i=0;i<cheats.length;i++) {
					let count=smap[y][x] + emap[cheats[i][0][0]][cheats[i][0][1]] + cheats[i][1];
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
	}
	console.log(noCheat);
	answer = save100;
	/*
	for(let i=50;i<savings.length;i++) {
		if(savings[i]) {
			console.log(`There are ${savings[i]} cheats that save ${i} picoseconds.`);
		}
	}
	*/
  console.log(answer);
});
