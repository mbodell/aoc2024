const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;
let rules = [];
let updates = [];
let phase = 0;

function testUpdate(up) {
	for(let i=0;i<up.length;i++) {
		let rule = rules[up[i]];
		if(rule!==undefined) {
			for(let j=0;j<rule.length;j++) {
				for(let k=0;k<i;k++) {
					if(rule[j]===up[k]) {
						return false;
					}
				}
			}
		}
	}
	return true;
}

eachLine(filename, function(line) {
	if(phase===0) {
		if(line.indexOf("|")===-1) {
			phase++;
		} else {
			let nums = line.split("|").map((x)=>parseInt(x));
			if(rules[nums[0]]===undefined) {
				rules[nums[0]] = [];
			}
			rules[nums[0]].push(nums[1]);
		}
	} else {
		updates.push(line.split(",").map((x)=>parseInt(x)));
	}
}).then(function(err) {
	for(let i=0;i<updates.length;i++) {
		if(testUpdate(updates[i])) {
			answer += updates[i][(updates[i].length-1)/2];
		}
	}
  console.log(answer);
});
