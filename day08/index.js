const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;
let imp = [];
let att = [];
let nodes = [];
let atype = [];

function calcNodes(co, lab) {
	for(let a=0;a<co.length-1;a++) {
		for(let b=a+1;b<co.length;b++) {
			let one = co[a];
			let two = co[b];
			let dy = one[0]-two[0];
			let dx = one[1]-two[1];
			let c1y = one[0]+dy;
			let c1x = one[1]+dx;
			if(c1y>=0&&c1y<maxY&&c1x>=0&&c1x<maxX) {
				nodes[c1y][c1x] = '#';
			}
			let c2y = two[0]-dy;
			let c2x = two[1]-dx;
			if(c2y>=0&&c2y<maxY&&c2x>=0&&c2x<maxX) {
				nodes[c2y][c2x] = '#';
			}
		}
	}
}

let maxX = 0;
let maxY = 0;

eachLine(filename, function(line) {
	imp.push(line.split(''));
}).then(function(err) {
	let y=0;
	let x=0;
	for(y=0;y<imp.length;y++) {
		nodes[y] = [];
		for(x=0;x<imp[y].length;x++) {
			nodes[y][x] = imp[y][x];
		  if(imp[y][x]!=='.') {
				if(att[imp[y][x]]===undefined) {
					att[imp[y][x]] = [];
					atype.push(imp[y][x]);
				}
				att[imp[y][x]].push([y,x]);
			}
		}
	}
	maxX = x;
	maxY = y;

	atype.map((x)=>calcNodes(att[x], x));

	answer=nodes.map((x)=>x.filter((f)=>f==='#').length).reduce((a,b)=>a+b);
  console.log(answer);
});
