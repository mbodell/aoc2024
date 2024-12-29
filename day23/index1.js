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
	for(let i=0;i<indNode.length;i++) {
		for(let j=0;j<indNode.length;j++) {
			if(indNode[i]!== indNode[j] &&
			  adj[indNode[i]].has(indNode[j])) {
				let ins = adj[indNode[i]].intersection(adj[indNode[j]]);
				ins.forEach((val)=>threes.add([indNode[i],indNode[j],val].sort().reduce((a,b)=>a+","+b)));
			}
		}
	}
	answer = threes.size;
	let prior = threes;
	let next;
	let num = 3;
	console.log(`There are ${prior.size} sets of ${num}`);
	while(prior.size>1) {
		next = new Set();
		wp = [...prior].map((x)=>x.split(','));
		for(let i=0;i<wp.length;i++) {
			let ins = adj[wp[i][0]].intersection(adj[wp[i][1]]);
			for(let j=2;j<wp[i].length;j++) {
				ins = ins.intersection(adj[wp[i][j]]);
			}
			ins.forEach((val)=>next.add(wp[i].concat([val]).sort().reduce((a,b)=>a+","+b)));
		}
		prior = next;
		num++;
		console.log(`There are ${prior.size} sets of ${num}`);
	}
	console.log(prior);
	prior.forEach((val)=>answer = val);
  console.log(answer);
});
