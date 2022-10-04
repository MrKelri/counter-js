'use-strict';
const container = document.querySelector('#container');
const numbers = Array.from(document.querySelectorAll('.num_tiles'));
const checkboxDecrease = document.getElementById('checkbox-direction')
// numbers[numbers.length - 1].style.color = 'orangered';

let n1;
let n10;
let n100;

// console.log(document.cookie)
const checkLocal = function () {
	var myVal = +localStorage.getItem('myVal');
	var checkboxState = localStorage.getItem('checkbox') === 'true';

	if (!myVal) {
		localStorage.setItem('myVal', '993');
		myVal = +localStorage.getItem('myVal');
	}
	
	checkboxDecrease.checked = checkboxState;
	console.log('Saved data: count: ' + myVal);
	console.log('Saved data: checkbox was checked? ' + checkboxState);
	return [checkboxState,myVal];
};

const locals=checkLocal();
const startCheckbox = locals[0];
const startVal = locals[1]; //local
const counter = {
	val: startVal,
	direction: false,
	counterManager(decrease = false){
		if(!decrease) this.direction?this.increase:this.decrease
		else !this.direction?this.increase:this.decrease
		return this
	},
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
	setVal(value) {
		if(!value) return;
		this.val = value;
		this.nInit();
		this.show;
		return;
		
	},
	get lazyNum() {
		n1 = this.val - n100 * 100 - n10 * 10;
		if (n1 === 10 || n1 === -1) {
			n1 = n1 === 10 ? 0 : 9;
			n10 = Math.floor((this.val - n100 * 100) / 10);
			if (n10 === 10 || n10 === -1) {
				n10 = n10 === 10 ? 0 : 9;
				n100 = Math.floor(this.val / 100);
			}
		}
		return [n100, n10, n1];
	},
	nInit() {
		// this.direction = startCheckbox;//HERE BUG
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
		localStorage.setItem('checkbox',counter.direction);
	},
};
counter.nInit();
counter.direction = startCheckbox;
counter.show;
let popupWindow = false;
checkboxDecrease.addEventListener('change',()=>{
	checkboxDecrease.checked?counter.direction = true:counter.direction=false;
}

);
const popup = document.getElementById('setCounter');
const inputValue = document.querySelector('.input-value');
const inputSetCounter = document.getElementById('input-setCounter');
const togglePopupWindow = function(){
	if(popupWindow){
		popup.classList.add('hidden')
		popupWindow = false;
		inputValue.value = '';
	}
	else{
		popup.classList.remove('hidden')
		popupWindow = true;
		inputSetCounter.focus();
		//need to handle mobile focus
	}
}
const clickHandler = function (e) {
	const targetID = e.target.id;
	if(popupWindow){
		if (targetID === 'accept'){
			counter.setVal(+inputSetCounter.value);
			togglePopupWindow();
			// document.focus();
		}
		else if(targetID === 'btn-back'||targetID === 'btn-setCounter' || targetID === 'three-dots'||!e.target.closest('.popupWindow')) {
			togglePopupWindow();
		}
		
	}
	else{
		if (!targetID === 'btn') return;
		else if (targetID === 'btn-completed'||targetID === 'container'|| e.target.closest('#counter')||e.target.localName === 'html' || e.target.localName === 'body') {
			counter.counterManager(true).show;
		} else if (targetID === 'btn-backward') {
			counter.counterManager(false).show;
		} else if (targetID === 'btn-setCounter'){
			togglePopupWindow();
		}  else if (targetID === 'three-dots'){
			togglePopupWindow();
		}
	}
};
// window.addEventListener('pagehide', function (e) {
// 	e.preventDefault();
// 	counter.save;
// });
document.addEventListener('click', function (e) {
	clickHandler(e);
	counter.save;
});
document.addEventListener('keypress', function (e) {
	// console.log(e.key);
	
	if (e.key === 'Enter'){
		if(popupWindow){
			   counter.setVal(+inputSetCounter.value);
			   togglePopupWindow();
	   }
	   else{
		counter.counterManager(true).show;
	   }	   
	} else if (e.key === 's') {
		counter.save;
	} else if (e.key === 'b') {
		if(!popupWindow)counter.counterManager(false).show;
	}
	counter.save;
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
