const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let reports = [];

eachLine(filename, function(line) {
	reports.push(line.split(" ").map((x)=>parseInt(x)));
}).then(function(err) {
	for(let i=0;i<reports.length;i++) {
		let dir = reports[i][1]-reports[i][0];
		let safe = true;
		for(let r=1;r<reports[i].length;r++) {
			let diff = reports[i][r]-reports[i][r-1];
			if(!((dir<0&&diff<0&&diff>=-3)||(dir>0&&diff>0&&diff<=3))) {
				safe = false;
			} 
		}
		if(safe) {
			answer++;
		}
	}
  console.log(answer);
});
