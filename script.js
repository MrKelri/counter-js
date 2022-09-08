'use-strict';
const container = document.querySelector('#container');
const numbers = Array.from(document.querySelectorAll('.num_tiles'));
// numbers[numbers.length - 1].style.color = 'orangered';

let n1;
let n10;
let n100;

// console.log(document.cookie)
const checkLocal = function () {
	var myVal = +localStorage.getItem('myVal');

	if (!myVal) {
		localStorage.setItem('myVal', '993');
		myVal = +localStorage.getItem('myVal');
	}
	console.log('Saved data: ' + myVal);
	return myVal;
};

const startVal = checkLocal(); //local
const counter = {
	val: startVal,
	get increase() {
		this.val++;
		if (this.val === 1000) this.val = 999;
		return this;
	},
	get decrease() {
		this.val--;
		if (this.val < 0) this.val = 0;
		return this;
	},
	get refresh() {
		this.val = startVal;
		return this;
	},
	set setVal(value) {
		this.val = value;
		return this;
	},
	get lazyNum() {
		n1 = this.val - n100 * 100 - n10 * 10;
		if (n1 === 10 || n1 === -1) {
			// console.log('Changed units digit');
			n1 = n1 === 10 ? 0 : 9;
			n10 = Math.floor((this.val - n100 * 100) / 10);
			if (n10 === 10 || n10 === -1) {
				// console.log('Changed tens digit');
				n10 = n10 === 10 ? 0 : 9;
				n100 = Math.floor(this.val / 100);
			}
		}
		return [n100, n10, n1];
	},
	nInit() {
		const sum = this.threeNumbers;
		n100 = sum[0];
		n10 = sum[1];
		n1 = sum[2];
	},
	get threeNumbers() {
		const hundreds = Math.floor(this.val / 100);
		const tens = Math.floor((this.val - hundreds * 100) / 10);
		const units = this.val - hundreds * 100 - tens * 10;
		const sum = [hundreds, tens, units];
		return sum;
	},
	get show() {
		this.lazyNum.forEach((num, i) => (numbers[i].textContent = num));
		return this;
	},
	get save() {
		localStorage.clear();
		localStorage.setItem('myVal', this.val);
	},
};
counter.nInit();
counter.show;

const clickHandler = function (e) {
	const targetID = e.target.id;
	// console.log(targetID.id);
	if (!targetID === 'btn') return;
	else if (targetID === 'btn-completed') {
		counter.decrease.show;
	} else if (targetID === 'btn-backward') {
		counter.increase.show;
	} 
	// else if (targetID.contains('btn_save')) {
	// 	counter.save;
	// }
};
window.addEventListener('pagehide', function (e) {
	e.preventDefault();
	counter.save;
});
container.addEventListener('click', function (e) {
	clickHandler(e);
});
document.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		counter.decrease.show;
	} else if (e.key === 's') {
		counter.save;
	}
});
window.addEventListener(
	'touchmove',
	ev => {
		if (weShouldStopDefaultScrollAndZoom) {
			ev.preventDefault();
			ev.stopImmediatePropagation();
		}
	},
	{ passive: false }
);
