const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let nodes = [];

let adj = [];

let index = 0;

let ts = [];

let indNode = [];

function checkNode(n) {
	if(nodes[n]===undefined) {
		nodes[n] = index++;
		indNode.push(n);
		adj[n] = new Set();
		if(n[0]==='t') {
			ts.push(nodes[n]);
		}
	}
}

eachLine(filename, function(line) {
	let [a, b] = line.split('-');
	checkNode(a);
	checkNode(b);
	adj[a].add(b);
	adj[b].add(a);
}).then(function(err) {
	let threes = new Set();
	for(let i=0;i<ts.length;i++) {
		for(let j=0;j<indNode.length;j++) {
			if(indNode[ts[i]]!== indNode[j] &&
			  adj[indNode[ts[i]]].has(indNode[j])) {
				let ins = adj[indNode[ts[i]]].intersection(adj[indNode[j]]);
				ins.forEach((val)=>threes.add([indNode[ts[i]],indNode[j],val].sort().map((x)=>x.toString()).reduce((a,b)=>a+","+b)));
			}
		}
	}
	answer = threes.size;
  console.log(answer);
});
