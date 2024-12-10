const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let tmap = [];

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

function countTrails(y,x) {
	let path = [];
	path[0] = [];
	path[0].push([y,x]);
	for(let h=0;h<9;h++) {
		path[h+1]=[];
		for(let i=0;i<path[h].length;i++) {
			let co = path[h][i];
			let ty;
			let tx;
			for(let d=UP;d<=LEFT;d++) {
				switch(d) {
					case UP:
						ty = co[0]-1;
						tx = co[1];
						break;
					case RIGHT:
						ty = co[0];
						tx = co[1]+1;
						break;
					case DOWN:
						ty = co[0]+1;
						tx = co[1];
						break;
					case LEFT:
						ty = co[0];
						tx = co[1]-1;
						break;
				}
				if(ty>=0&&ty<tmap.length) {
					if(tmap[ty][tx]===h+1) {
						path[h+1].push([ty,tx]);
					}
				}
			}
		}
	}
	return path[9].length;
}

eachLine(filename, function(line) {
	tmap.push(line.split('').map((x)=>parseInt(x)));
}).then(function(err) {
	for(let y=0;y<tmap.length;y++) {
		for(let x=0;x<tmap[y].length;x++) {
			if(tmap[y][x]===0) {
				answer += countTrails(y,x);
			}
		}
	}
  console.log(answer);
});
