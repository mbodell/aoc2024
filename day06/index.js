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

eachLine(filename, function(line) {
	map.push(line.split(""));
}).then(function(err) {
	let maxY = map.length;
	let maxX = map[0].length;
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
	answer = map.map((x)=>x.filter((f)=>f==='X').length).reduce((a,b)=>a+b);


	console.log(answer);
});
