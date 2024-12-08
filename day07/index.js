const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let eq = [];
let tar = [];

eachLine(filename, function(line) {
	let parts = line.split(': ');
	tar.push(parseInt(parts[0]));
	eq.push(parts[1].split(' ').map((x)=>parseInt(x)));
}).then(function(err) {
	for(let i=0; i<eq.length; i++) {
		let inP = [];
		inP[0] = [];
		inP[0].push(eq[i][0]);
		for(let t=1; t<eq[i].length;t++) {
			inP[t] = [];
			inP[t-1].map((x)=>(inP[t].push(x+eq[i][t]),inP[t].push(x*eq[i][t])));
		}
		if(inP[eq[i].length-1].filter((f)=>f===tar[i]).length>0) {
			answer += tar[i];
		}
	}
  console.log(answer);
});
