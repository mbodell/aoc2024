const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let first = [];
let second = [];

eachLine(filename, function(line) {
  let nums = line.match(/\d+/g);
	first.push(parseInt(nums[0]));
	second.push(parseInt(nums[1]));
}).then(function(err) {
  first.sort();
	second.sort();
	for(let i=0; i<first.length; i++) {
		answer += Math.abs(first[i]-second[i]);
	}
  console.log(answer);
});
