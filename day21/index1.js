const lineReader = require("line-reader");
const Promise = require('bluebird');

const eachLine = Promise.promisify(lineReader.eachLine);

let filename = process.argv.slice(2)[0] || 'input.txt';

let answer = 0;

let inp = [];
let num = [];

let memo = [];

const NUMA = 'A';
const NUM0 = '0';
const NUM1 = '1';
const NUM2 = '2';
const NUM3 = '3';
const NUM4 = '4';
const NUM5 = '5';
const NUM6 = '6';
const NUM7 = '7';
const NUM8 = '8';
const NUM9 = '9';

function findNum(s) {
	let ret = [];
	let state = NUMA;
	ret.push("");
	for(let i=0;i<s.length;i++) {
		let n = [];
		switch(s[i]) {
			case NUMA:
				switch(state) {
					case NUMA:
						n.push('A');
						break;
					case NUM0:
						n.push('>A');
						break;
					case NUM1:
						n.push('v>>A');
						n.push('>v>A');
						break;
					case NUM2:
						n.push('v>A');
						n.push('>vA');
						break;
					case NUM3:
						n.push('vA');
						break;
					case NUM4:
						n.push('vv>>A');
						n.push('v>v>A');
						n.push('v>>vA');
						n.push('>vv>A');
						n.push('>v>vA');
						break;
					case NUM5:
						n.push('vv>A');
						n.push('v>vA');
						n.push('>vvA');
						break;
					case NUM6:
						n.push('vvA');
						break;
					case NUM7:
						n.push('vvv>>A');
						n.push('vv>v>A');
						n.push('vv>>vA');
						n.push('v>vv>A');
						n.push('v>v>vA');
						n.push('v>>vvA');
						n.push('>vvv>A');
						n.push('>vv>vA');
						n.push('>v>vvA');
						break;
					case NUM8:
						n.push('vvv>A');
						n.push('vv>vA');
						n.push('v>vvA');
						n.push('>vvvA');
						break;
					case NUM9:
						n.push('vvvA');
						break;
				}
				state = NUMA;
				break;
			case NUM0:
				switch(state) {
					case NUMA:
						n.push('<A');
						break;
					case NUM0:
						n.push('A');
						break;
					case NUM1:
						n.push('>vA');
						break;
					case NUM2:
						n.push('vA');
						break;
					case NUM3:
						n.push('v<A');
						n.push('<vA');
						break;
					case NUM4:
						n.push('>vvA');
						n.push('v>vA');
						break;
					case NUM5:
						n.push('vvA');
						break;
					case NUM6:
						n.push('<vvA');
						n.push('v<vA');
						n.push('vv<A');
						break;
					case NUM7:
						n.push('>vvvA');
						n.push('v>vvA');
						n.push('vv>vA');
						break;
					case NUM8:
						n.push('vvvA');
						break;
					case NUM9:
						n.push('<vvvA');
						n.push('v<vvA');
						n.push('vv<vA');
						n.push('vvv<A');
						break;
				}
				state = NUM0;
				break;
			case NUM1:
				switch(state) {
					case NUMA:
						n.push('^<<A');
						n.push('<^<A');
						break;
					case NUM0:
						n.push('^<A');
						break;
					case NUM1:
						n.push('A');
						break;
					case NUM2:
						n.push('<A');
						break;
					case NUM3:
						n.push('<<A');
						break;
					case NUM4:
						n.push('vA');
						break;
					case NUM5:
						n.push('v<A');
						n.push('<vA');
						break;
					case NUM6:
						n.push('<<vA');
						n.push('<v<A');
						n.push('v<<A');
						break;
					case NUM7:
						n.push('vvA');
						break;
					case NUM8:
						n.push('<vvA');
						n.push('v<vA');
						n.push('vv<A');
						break;
					case NUM9:
						n.push('<<vvA');
						n.push('<v<vA');
						n.push('<vv<A');
						n.push('v<<vA');
						n.push('v<v<A');
						n.push('vv<<A');
						break;
				}
				state = NUM1;
				break;
			case NUM2:
				switch(state) {
					case NUMA:
						n.push('<^A');
						n.push('^<A');
						break;
					case NUM0:
						n.push('^A');
						break;
					case NUM1:
						n.push('>A');
						break;
					case NUM2:
						n.push('A');
						break;
					case NUM3:
						n.push('<A');
						break;
					case NUM4:
						n.push('>vA');
						n.push('v>A');
						break;
					case NUM5:
						n.push('vA');
						break;
					case NUM6:
						n.push('<vA');
						n.push('v<A');
						break;
					case NUM7:
						n.push('vv>A');
						n.push('v>vA');
						n.push('>vvA');
						break;
					case NUM8:
						n.push('vvA');
						break;
					case NUM9:
						n.push('<vvA');
						n.push('v<vA');
						n.push('vv<A');
						break;
				}
				state = NUM2;
				break;
			case NUM3:
				switch(state) {
					case NUMA:
						n.push('^A');
						break;
					case NUM0:
						n.push('^>A');
						n.push('>^A');
						break;
					case NUM1:
						n.push('>>A');
						break;
					case NUM2:
						n.push('>A');
						break;
					case NUM3:
						n.push('A');
						break;
					case NUM4:
						n.push('>>vA');
						n.push('>v>A');
						n.push('v>>A');
						break;
					case NUM5:
						n.push('>vA');
						n.push('v>A');
						break;
					case NUM6:
						n.push('vA');
						break;
					case NUM7:
						n.push('>>vvA');
						n.push('>v>vA');
						n.push('>vv>A');
						n.push('v>>vA');
						n.push('v>v>A');
						n.push('vv>>A');
						break;
					case NUM8:
						n.push('>vvA');
						n.push('v>vA');
						n.push('vv>A');
						break;
					case NUM9:
						n.push('vvA');
						break;
				}
				state = NUM3;
				break;
			case NUM4:
				switch(state) {
					case NUMA:
						n.push('^^<<A');
						n.push('^<^<A');
						n.push('^<<^A');
						n.push('<^^<A');
						n.push('<^<^A');
						break;
					case NUM0:
						n.push('^^<A');
						n.push('^<^A');
						break;
					case NUM1:
						n.push('^A');
						break;
					case NUM2:
						n.push('^<A');
						n.push('<^A');
						break;
					case NUM3:
						n.push('<<^A');
						n.push('<^<A');
						n.push('^<<A');
						break;
					case NUM4:
						n.push('A');
						break;
					case NUM5:
						n.push('<A');
						break;
					case NUM6:
						n.push('<<A');
						break;
					case NUM7:
						n.push('vA');
						break;
					case NUM8:
						n.push('v<A');
						n.push('<vA');
						break;
					case NUM9:
						n.push('<<vA');
						n.push('<v<A');
						n.push('v<<A');
						break;
				}
				state = NUM4;
				break;
			case NUM5:
				switch(state) {
					case NUMA:
						n.push('^^<A');
						n.push('^<^A');
						n.push('<^^A');
						break;
					case NUM0:
						n.push('^^A');
						break;
					case NUM1:
						n.push('^>A');
						n.push('>^A');
						break;
					case NUM2:
						n.push('^A');
						break;
					case NUM3:
						n.push('^<A');
						n.push('<^A');
						break;
					case NUM4:
						n.push('>A');
						break;
					case NUM5:
						n.push('A');
						break;
					case NUM6:
						n.push('<A');
						break;
					case NUM7:
						n.push('>vA');
						n.push('v>A');
						break;
					case NUM8:
						n.push('vA');
						break;
					case NUM9:
						n.push('v<A');
						n.push('<vA');
						break;
				}
				state = NUM5;
				break;
			case NUM6:
				switch(state) {
					case NUMA:
						n.push('^^A');
						break;
					case NUM0:
						n.push('^^>A');
						n.push('^>^A');
						n.push('>^^A');
						break;
					case NUM1:
						n.push('>>^A');
						n.push('>^>A');
						n.push('^>>A');
						break;
					case NUM2:
						n.push('>^A');
						n.push('^>A');
						break;
					case NUM3:
						n.push('^A');
						break;
					case NUM4:
						n.push('>>A');
						break;
					case NUM5:
						n.push('>A');
						break;
					case NUM6:
						n.push('A');
						break;
					case NUM7:
						n.push('>>vA');
						n.push('>v>A');
						n.push('v>>A');
						break;
					case NUM8:
						n.push('v>A');
						n.push('>vA');
						break;
					case NUM9:
						n.push('vA');
						break;
				}
				state = NUM6;
				break;
			case NUM7:
				switch(state) {
					case NUMA:
						n.push('^^^<<A');
						n.push('^^<^<A');
						n.push('^^<<^A');
						n.push('^<^^<A');
						n.push('^<^<^A');
						n.push('^<<^^A');
						n.push('<^^^<A');
						n.push('<^^<^A');
						n.push('<^<^^A');
						break;
					case NUM0:
						n.push('^^^<A');
						n.push('^^<^A');
						n.push('^<^^A');
						break;
					case NUM1:
						n.push('^^A');
						break;
					case NUM2:
						n.push('^^<A');
						n.push('^<^A');
						n.push('<^^A');
						break;
					case NUM3:
						n.push('^^<<A');
						n.push('^<^<A');
						n.push('^<<^A');
						n.push('<^<^A');
						n.push('<^^<A');
						n.push('<<^^A');
						break;
					case NUM4:
						n.push('^A');
						break;
					case NUM5:
						n.push('^<A');
						n.push('<^A');
						break;
					case NUM6:
						n.push('<<^A');
						n.push('<^<A');
						n.push('^<<A');
						break;
					case NUM7:
						n.push('A');
						break;
					case NUM8:
						n.push('<A');
						break;
					case NUM9:
						n.push('<<A');
						break;
				}
				state = NUM7;
				break;
			case NUM8:
				switch(state) {
					case NUMA:
						n.push('^^^<A');
						n.push('^^<^A');
						n.push('^<^^A');
						n.push('<^^^A');
						break;
					case NUM0:
						n.push('^^^A');
						break;
					case NUM1:
						n.push('^^>A');
						n.push('^>^A');
						n.push('>^^A');
						break;
					case NUM2:
						n.push('^^A');
						break;
					case NUM3:
						n.push('^^<A');
						n.push('^<^A');
						n.push('<^^A');
						break;
					case NUM4:
						n.push('^>A');
						n.push('>^A');
						break;
					case NUM5:
						n.push('^A');
						break;
					case NUM6:
						n.push('^<A');
						n.push('<^A');
						break;
					case NUM7:
						n.push('>A');
						break;
					case NUM8:
						n.push('A');
						break;
					case NUM9:
						n.push('<A');
						break;
				}
				state = NUM8;
				break;
			case NUM9:
				switch(state) {
					case NUMA:
						n.push('^^^A');
						break;
					case NUM0:
						n.push('^^^>A');
						n.push('^^>^A');
						n.push('^>^^A');
						n.push('>^^^A');
						break;
					case NUM1:
						n.push('^^>>A');
						n.push('^>^>A');
						n.push('^>>^A');
						n.push('>>^^A');
						break;
					case NUM2:
						n.push('^^>A');
						n.push('^>^A');
						n.push('>^^A');
						break;
					case NUM3:
						n.push('^^A');
						break;
					case NUM4:
						n.push('>>^A');
						n.push('>^>A');
						n.push('^>>A');
						break;
					case NUM5:
						n.push('^>A');
						n.push('>^A');
						break;
					case NUM6:
						n.push('^A');
						break;
					case NUM7:
						n.push('>>A');
						break;
					case NUM8:
						n.push('>A');
						break;
					case NUM9:
						n.push('A');
						break;
				}
				state = NUM9;
				break;
		}
		let nret = [];
		for(let j=0;j<ret.length;j++) {
			for(let k=0;k<n.length;k++) {
				nret.push(ret[j] + n[k]);
			}
		}
		ret = nret;
	}
	return ret;
}

const KEYA = 'A';
const KEYU = '^';
const KEYR = '>';
const KEYD = 'v';
const KEYL = '<';

function findKey(s) {
	let ret = [];
	let state = KEYA;
	ret.push("");
	for(let i=0;i<s.length;i++) {
		let n = [];
		switch(s[i]) {
			case KEYA:
				switch(state) {
					case KEYA:
						n.push('A');
						break;
					case KEYU:
						n.push('>A');
						break;
					case KEYR:
						n.push('^A');
						break;
					case KEYD:
						n.push('^>A');
						n.push('>^A');
						break;
					case KEYL:
						n.push('>>^A');
						n.push('>^>A');
						break;
				}
				state = KEYA;
				break;
			case KEYU:
				switch(state) {
					case KEYA:
						n.push('<A');
						break;
					case KEYU:
						n.push('A');
						break;
					case KEYR:
						n.push('^<A');
						n.push('<^A');
						break;
					case KEYD:
						n.push('^A');
						break;
					case KEYL:
						n.push('>^A');
						break;
				}
				state = KEYU;
				break;
			case KEYR:
				switch(state) {
					case KEYA:
						n.push('vA');
						break;
					case KEYU:
						n.push('v>A');
						n.push('>vA');
						break;
					case KEYR:
						n.push('A');
						break;
					case KEYD:
						n.push('>A');
						break;
					case KEYL:
						n.push('>>A');
						break;
				}
				state = KEYR;
				break;
			case KEYD:
				switch(state) {
					case KEYA:
						n.push('v<A');
						n.push('<vA');
						break;
					case KEYU:
						n.push('vA');
						break;
					case KEYR:
						n.push('<A');
						break;
					case KEYD:
						n.push('A');
						break;
					case KEYL:
						n.push('>A');
						break;
				}
				state = KEYD;
				break;
			case KEYL:
				switch(state) {
					case KEYA:
						n.push('v<<A');
						n.push('<v<A');
						break;
					case KEYU:
						n.push('v<A');
						break;
					case KEYR:
						n.push('<<A');
						break;
					case KEYD:
						n.push('<A');
						break;
					case KEYL:
						n.push('A');
						break;
				}
				state = KEYL;
				break;
		}
		let nret = [];
		for(let j=0;j<ret.length;j++) {
			for(let k=0;k<n.length;k++) {
				nret.push(ret[j]+n[k]);
			}
		}
		ret = nret;
	}
	return ret;
}

function findKeyR(str,num) {
	if(num===0) {
		return str;
	} else {
		return findKeyR(findKey(str)[0],num-1);
	}
}

function findKeySlen(str, num) {
	if(num===0) {
		return str.length;
	} else {
		if(num<24&&memo[num][str]!==undefined) {
			return memo[num][str];
		}
		let n = 0;
		let s=str.split('A').map((x)=>x+'A');
		for(let i=0;i<s.length-1;i++) {
			let nl = 423797863237514;
			let f=findKey(s[i]);
			for(let j=0;j<f.length;j++) {
				let nj = findKeySlen(f[j],num-1);
				if(nj<nl) {
					nl=nj;
				}
			}
			n += nl;
		}
		if(num<24) {
			memo[num][str] = n;
		}
		return n;
	}
}

eachLine(filename, function(line) {
	inp.push(line.split(''));
	num.push(parseInt(line));
}).then(function(err) {
	for(let i=0;i<24;i++) {
		memo[i] = [];
	}
	for(let i=0;i<inp.length;i++) {
		let f=findNum(inp[i]);
		let nl = 0;
		for(let j=0;j<f.length;j++) {
			let len = findKeySlen(f[j],25);
			if(nl===0) {
				nl = len;
			} else if (len < nl) {
				nl = len;
			}
		}
		answer += num[i]*nl;
		console.log(`For ${i} which is ${inp[i]} we got ${num[i]*nl} from ${f}`);
	}
  console.log(answer);
});
