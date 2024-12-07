const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let map = [];

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

function testCycle(y,x,sy,sx) {
	let tmap = [];
	let u = [];
	let r = [];
	let d = [];
	let l = [];
	for(let cy=0;cy<maxY;cy++) {
		tmap[cy] = [];
		u[cy] = [];
		r[cy] = [];
		d[cy] = [];
		l[cy] = [];
		for(let cx=0;cx<maxX;cx++) {
			if(cy===y&&cx===x) {
				tmap[cy][cx] = '#';
			} else {
				tmap[cy][cx] = map[cy][cx];
			}
		}
	}
	let dir = UP;
	while(sx>=0&&sx<maxX&&sy>=0&sy<maxY) {
		switch(dir) {
			case UP:
				if(sy>0&&tmap[sy-1][sx]==='#') {
					dir = RIGHT;
					if(r[sy-1][sx]) {
						return true;
					} else {
						r[sy-1][sx] = true;
					}
				} else {
					sy--;
				}
				break;
			case RIGHT:
				if(tmap[sy][sx+1]==='#') {
					dir = DOWN;
					if(d[sy][sx+1]) {
						return true;
					} else {
						d[sy][sx+1] = true;
					}
				} else {
					sx++;
				}
				break;
			case DOWN:
				if((sy+1)<maxY&&tmap[sy+1][sx]==='#') {
					dir = LEFT;
					if(l[sy+1][sx]) {
						return true;
					} else {
						l[sy+1][sx] = true;
					}
				} else {
					sy++;
				}
				break;
			case LEFT:
				if(tmap[sy][sx-1]==='#') {
					dir = UP;
					if(u[sy][sx-1]) {
						return true;
					} else {
						u[sy][sx-1] = true;
					}
				} else {
					sx--;
				}
				break;
		}
	}
	return false;

}

let maxY;
let maxX;

eachLine(filename, function(line) {
	map.push(line.split(""));
}).then(function(err) {
	maxY = map.length;
	maxX = map[0].length;
	let sx = 0;
	let sy = 0;
	let start = false;
	for(let y=0;y<maxY&&!start;y++) {
		for(let x=0;x<maxX&&!start;x++) {
			if(map[y][x]==='^') {
				sx = x;
				sy = y;
				start = true;
			}
		}
	}
	let ox = sx;
	let oy = sy;
	let dir = UP;
	while(sx>=0&&sx<maxX&&sy>=0&sy<maxY) {
		map[sy][sx]='X';
		switch(dir) {
			case UP:
				if(sy>0&&map[sy-1][sx]==='#') {
					dir = RIGHT;
				} else {
					sy--;
				}
				break;
			case RIGHT:
				if(map[sy][sx+1]==='#') {
					dir = DOWN;
				} else {
					sx++;
				}
				break;
			case DOWN:
				if((sy+1)<maxY&&map[sy+1][sx]==='#') {
					dir = LEFT;
				} else {
					sy++;
				}
				break;
			case LEFT:
				if(map[sy][sx-1]==='#') {
					dir = UP;
				} else {
					sx--;
				}
				break;
		}
	}
	for(let ty=0;ty<maxY;ty++) {
		for(let tx=0;tx<maxX;tx++) {
			if(map[ty][tx]==='X'&&(ty!==oy||tx!==ox)) {
				if(testCycle(ty, tx, oy, ox)) {
					answer++;
				}
			}
		}
	}


	console.log(answer);
});
