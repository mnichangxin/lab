(function() {

	//模拟JSON对象
	var obj = {
		'img': ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg', 'img/7.jpg','img/8.jpg', 'img/9.jpg', 'img/11.jpg', 'img/12.jpg','img/13.jpg', 'img/14.jpg', 'img/15.jpg', 'img/16.jpg', 'img/17.jpg','img/18.jpg', 'img/19.jpg', 'img/20.jpg', 'img/21.jpg','img/22.jpg','img/23.jpg', 'img/24.jpg', 'img/25.jpg']
	};

	//配置常量：列数，间隔
	var config = {
		cols: 3,
		interval: 20
	};

	//事件兼容处理
	var EventUtil = {
		addHandler: function(obj, type, handler) {
			if(obj.addEventListener) {
				obj.addEventListener(type, handler, false);
			} else if (obj.attachEvent) {
				obj.attachEvent('on' + type, handler);
			} else {
				obj['on' + type] = handler;
			}
		}
	}

	preloader(obj.img);

	window.onload = function() {
		render();	
		calculation(config.cols, config.interval);

		var waterfall = document.getElementsByClassName('waterfall')[0];

		EventUtil.addHandler(waterfall, 'click', modalHandler);
	}

	window.onresize = function() {
		render();	
		calculation(config.cols, config.interval);
	}

	//渲染函数
	function render() {
		var waterfall = document.getElementsByClassName('waterfall')[0],
	             wrap = '';
	    
	    var data = obj.img;

	    data.forEach(function(value, index, array) {
	    	wrap += '<div class="box"><div class="wrap"><img src=' + value + '></div></div>';
	    });
		
	    waterfall.innerHTML = wrap;
	}

	//位置计算函数
	function calculation(cols, interval) {
		var waterfall = document.getElementsByClassName('waterfall')[0],
		          box = document.getElementsByClassName('box');

		var queue = []; //存储第一行的高度

		var scWidth = document.documentElement.clientWidth || document.body.clientWidth;

		var boxWidth = Math.floor((scWidth - (cols + 1) * interval) / cols);

		waterfall.style.padding = interval / 2 + 'px';

		for (var i = 0, len = box.length; i < len; ++i) {
			box[i].style.padding = interval / 2 + 'px';
			box[i].style.width = boxWidth + 'px';

			if (i < cols) {
				queue.push(box[i].offsetHeight);
			} else {
				var minHeight = Math.min.apply(null, queue),
			      minHeightIndex = queue.indexOf(minHeight);

				box[i].style.position = 'absolute';
				box[i].style.top = minHeight + 'px';
				box[i].style.left = box[minHeightIndex].offsetLeft + 'px';
	            queue[minHeightIndex] += box[i].offsetHeight;
			}
		}
	}

	//模态弹框
	function modalHandler (event) {
		var target = event.target;

		if (target.tagName.toLowerCase() == 'img') {
			var mask = document.createElement('div');
			   modal = document.createElement('div');

			mask.setAttribute('class', 'mask');
			modal.setAttribute('class', 'modal');

			modal.innerHTML = '<img src=' + target.src + '>';
		
			document.body.appendChild(mask);
			document.body.appendChild(modal);

			document.body.style.overflow = 'hidden';

			var scWidth = document.documentElement.clientWidth || document.body.clientWidth,
			   scHeight = document.documentElement.clientHeight || document.body.clientHeight,
		          modal = document.getElementsByClassName('modal')[0],
		         mWidth = modal.offsetWidth,
		        mHeight = modal.offsetHeight;

		    if (mWidth >= scWidth) {
		    	modal.style.width = mWidth / 2 + 'px';
		    	mWidth = modal.offsetWidth;
		    }
		   	if (mHeight >= scHeight) {
		    	modal.style.height = mHeight / 2 + 'px';
		    	mHeight = modal.offsetHeight;
		    } 

		    modal.style.left = (scWidth - mWidth) / 2 + 'px';
		    modal.style.top = (scHeight - mHeight) / 2 + 'px';

			EventUtil.addHandler(mask, 'click', function() {
				document.body.removeChild(mask);
				document.body.removeChild(modal);
				document.body.style.overflow = 'auto';
			});
		}
	}

	//图片预加载
	function preloader(arr) {
		var newimages = [], loadedimages = 0;
		var postaction = function() {};
		var arr = (typeof arr != 'object') ? [arr] : arr;

		function imageloadpost() {
			loadedimages++;
			if (loadedimages == arr.length) {
				postaction(newimages);
			}
		}

		for (var i = 0, len = arr.length; i < len; ++i) {
			newimages[i] = new Image();
			newimages[i].src = arr[i];
			newimages[i].onload = function() {
				imageloadpost();
			}
			newimages.onerror = function() {
				imageloadpost();
			}
		}
		return {
			done: function(f) {
				postaction = f || postaction;
			}
		}
	}

})();

