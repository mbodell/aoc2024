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
	let reg = [];
	next.push([y,x]);
	for(let ry=0;ry<inp.length;ry++) {
		reg[ry] = [];
		for(let rx=0;rx<inp[y].length;rx++) {
			reg[ry][rx]=0;
		}
	}
	while(next.length>0) {
		let c = next.shift();
		y = c[0];
		x = c[1];
		if(visit[y][x]!==1) {
			area++;
			visit[y][x]=1;
			reg[y][x]=1;
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
	let sides=0;
	let up=0;
	let down=0;
	let right=0;
	let left =0;
	for(let y=0;y<reg.length;y++) {
		for(let x=0;x<reg.length;x++) {
			if(!(y>0&&reg[y-1][x]===1&&reg[y][x]===1)) {
				if(reg[y][x]===1) {
					if(up===0) {
						up=1;
						sides++;
					}
				} else {
					up=0;
				}
			} else {
				up = 0;
			}
			if(!((y+1)<reg.length&&reg[y+1][x]===1&&reg[y][x]===1)) {
				if(reg[y][x]===1) {
					if(down===0) {
						down = 1;
						sides++;
					}
				} else {
					down = 0;
				}
			} else {
				down = 0;
			}
		}
	}
	for(let x=0;x<reg[0].length;x++) {
		for(let y=0;y<reg.length;y++) {
			if(!(x>0&&reg[y][x-1]===1&&reg[y][x]===1)) {
				if(reg[y][x]===1) {
					if(left ===0) {
						left = 1;
						sides++;
					}
				} else {
					left = 0;
				}
			} else {
				left = 0;
			}
			if(!((x+1)<reg[0].length&&reg[y][x+1]===1&&reg[y][x]===1)) {
				if(reg[y][x]===1) {
					if(right===0) {
						right = 1;
						sides++;
					}
				} else {
					right = 0;
				}
			} else {
				right = 0;
			}
		}
	}
	//console.log(`A region of ${cur} plants with price of ${area} * ${sides} = ${area*sides}.`);
	return area*sides;
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
