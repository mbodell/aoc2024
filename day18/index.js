const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

const GRID=7;
const HIT=12;

let inp=[];
let map=[];

eachLine(filename, function(line) {
	inp.push(line.split(',').map((x)=>parseInt(x)));
}).then(function(err) {
	for(let y=0; y<GRID; y++) {
		for(let x=0; x<GRID; x++) {
			map[y][x] = '.';
		}
	}
	for(let i=0;i<HIT;i++) {
		map[inp[i][1]][inp[i][0]] = '#';
	}
	solvePath();

  console.log(answer);
});
