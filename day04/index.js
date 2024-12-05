const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;
let grid = [];

eachLine(filename, function(line) {
	grid.push(line.split(''));
}).then(function(err) {
	for(let y=0;y<grid.length;y++) {
		for(let x=0;x<grid[y].length;x++) {
			if(grid[y][x]==='X') {
				if(grid[y][x+1]==='M'&&grid[y][x+2]==='A'&&grid[y][x+3]==='S') {
					answer++;
				}
				if(grid[y][x-1]==='M'&&grid[y][x-2]==='A'&&grid[y][x-3]==='S') {
					answer++;
				}
				if(y>2) {
					if(grid[y-1][x+1]==='M'&&grid[y-2][x+2]==='A'&&grid[y-3][x+3]==='S') {
						answer++;
					}
					if(grid[y-1][x-1]==='M'&&grid[y-2][x-2]==='A'&&grid[y-3][x-3]==='S') {
						answer++;
					}
					if(grid[y-1][x]==='M'&&grid[y-2][x]==='A'&&grid[y-3][x]==='S') {
						answer++;
					}
				}
				if(y+3<grid.length) {
					if(grid[y+1][x+1]==='M'&&grid[y+2][x+2]==='A'&&grid[y+3][x+3]==='S') {
						answer++;
					}
					if(grid[y+1][x-1]==='M'&&grid[y+2][x-2]==='A'&&grid[y+3][x-3]==='S') {
						answer++;
					}
					if(grid[y+1][x]==='M'&&grid[y+2][x]==='A'&&grid[y+3][x]==='S') {
						answer++;
					}
				}
			}
		}
	}
  console.log(answer);
});
