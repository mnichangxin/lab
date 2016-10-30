window.onload = function() {
	var val = document.getElementById('val');

	val.onchange = getVal;
}
function getVal() {
	var left = document.getElementById('left');
	var right = document.getElementById('right');
	var middle = document.getElementById('middle');

	var ls = '20px solid';
	var color;
	
	if(this.value >= 10 && this.value <= 30){
		color = ' #963B18';
	}else if(this.value >= 40 && this.value <= 60){
		color = ' #AB7518';
	}else if(this.value >= 70 && this.value <= 80){
		color = ' #616C3D';
	}else{
		color = ' #336B1F';
	}

	left.style.borderBottom = ls + color;
	left.style.borderLeft = ls + color;
	right.style.borderTop = ls + color;
	right.style.borderRight = ls + color;

	left.style.animation = 'cl' + this.value + ' 1s linear 1s forwards';
	right.style.animation = 'cr' + this.value + ' 1s linear forwards';
	middle.style.animation = 'ml' + this.value + ' 2s linear forwards';

	left.style['-webkit-animation'] = 'cl' + this.value + ' 1s linear 1s forwards';
	right.style['-webkit-animation'] = 'cr' + this.value + ' 1s linear forwards';
	middle.style['-webkit-animation'] = 'ml' + this.value + ' 2s linear forwards';

	middle.innerHTML = this.value + '%';
}