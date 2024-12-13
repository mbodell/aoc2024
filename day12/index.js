const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let inp = [];
let visit = [];

function fillPlot(y, x) {
	let cur = inp[y][x];
	let area = 0;
	let perimeter = 0;
	let next = [];
	next.push([y,x]);
	while(next.length>0) {
		let c = next.shift();
		y = c[0];
		x = c[1];
		if(visit[y][x]!==1) {
			area++;
			visit[y][x]=1;
			if(!(y>0&&inp[y-1][x]===cur)) {
				perimeter++;
			} else {
				if(y>0 && visit[y-1][x]!==1) {
					next.push([y-1,x]);
				}
			}
			if(!((y+1)<inp.length&&inp[y+1][x]===cur)) {
				perimeter++;
			} else {
				if((y+1)<inp.length && visit[y+1][x]!==1) {
					next.push([y+1,x]);
				}
			}
			if(inp[y][x-1]!==cur) {
				perimeter++;
			} else {
				if(x>0 && visit[y][x-1]!==1) {
					next.push([y,x-1]);
				}
			}
			if(inp[y][x+1]!==cur) {
				perimeter++;
			} else {
				if((x+1)<inp.length && visit[y][x+1]!==1) {
					next.push([y,x+1]);
				}
			}
		}
	}
	//console.log(`A region of ${cur} plants with price of ${area} * ${perimeter} = ${area*perimeter}.`);
	return area*perimeter;
}

eachLine(filename, function(line) {
	inp.push(line.split(''));
	visit.push([]);
}).then(function(err) {
	for(let y=0;y<inp.length;y++) {
		for(let x=0;x<inp[y].length;x++) {
			if(visit[y][x]!==1) {
				answer += fillPlot(y, x);
			}
		}
	}
	console.log(answer);
});
