const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let reports = [];

function testReports(rep) {
	let dir = rep[1]-rep[0];
	let safe = true;
	for(let r=1;r<rep.length;r++) {
		let diff = rep[r]-rep[r-1];
		if(!((dir<0&&diff<0&&diff>=-3)||(dir>0&&diff>0&&diff<=3))) {
			safe = false;
		} 
	}
	return safe;
}

eachLine(filename, function(line) {
	reports.push(line.split(" ").map((x)=>parseInt(x)));
}).then(function(err) {
	for(let i=0;i<reports.length;i++) {
		if(testReports(reports[i])) {
			answer++;
		} else if (testReports(reports[i].slice(1))) {
			answer++;
		} else {
			let good = false;
			for(let j=1;!good&&j<reports[i].length;j++) {
				good = testReports(reports[i].slice(0,j).concat(reports[i].slice(j+1)));
			}
			if(good) {
				answer++;
			}
		}
	}
  console.log(answer);
});
