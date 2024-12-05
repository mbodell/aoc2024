const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;
let grid = [];

eachLine(filename, function(line) {
	grid.push(line.split(''));
}).then(function(err) {
	for(let y=1;y<grid.length-1;y++) {
		for(let x=0;x<grid[y].length;x++) {
			if(grid[y][x]==='A') {
				if(((grid[y+1][x+1]==='M'&&grid[y-1][x-1]==='S') ||
					  (grid[y+1][x+1]==='S'&&grid[y-1][x-1]==='M')) &&
					 ((grid[y+1][x-1]==='M'&&grid[y-1][x+1]==='S') ||
						(grid[y+1][x-1]==='S'&&grid[y-1][x+1]==='M'))) {
					answer++;
				}
			}
		}
	}
  console.log(answer);
});
