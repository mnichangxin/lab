/* 
 * unlock.js 
 * 2017/03/27 Create by mnichangxin
 */

var unlock = (function() {
	var
	    // 选择器封装
		$ = function(selector) {
			return document.querySelector(selector);
		},

		// 表单控件
		set = $('#set'),
		validate = $('#validate'),

		// 状态控件
		state = $('#state'),

		// 获得上下文
		canvas = $('#canvas'),
		ctx = canvas.getContext('2d'),

		// 各个圆位置的队列
		queue = [],

		// queue中的位置队列
		save = [],

		// 临时队列
		pre_save = [],

		// 密码输入次数判断
		flag = 0,

		// Circle初始参数
		para_init = {
			lineWidth: 3,
			strokeStyle: '#bbb',
			fillStyle: '#fff',
			r: 25
		},

		// Circle重绘参数
		para_upd = {
			strokeStyle: '#fb9009',
			fillStyle: '#ffa726'
		},

		// 初始化绘制圆形
		drawCircle = function() {
			ctx.lineWidth = para_init.lineWidth;
			ctx.strokeStyle = para_init.strokeStyle;
			ctx.fillStyle = para_init.fillStyle;

			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					var x = 100 * i + 2 * para_init.r,
						y = 100 * j + 2 * para_init.r,
						r = para_init.r;

					//记录圆心位置
					queue.push({
						x: x,
						y: y
					});

					// 画线
					ctx.beginPath();
					ctx.arc(x, y, r, 0, 2 * Math.PI);
					ctx.closePath();
					ctx.stroke();
					
					// 画填充
					ctx.beginPath();
					ctx.arc(x, y, r, 0, 2 * Math.PI);
					ctx.closePath();
					ctx.fill();
				} 
			}

		},

		// 触摸重绘圆形
		updateCircle = function(obj) {
			ctx.strokeStyle = para_upd.strokeStyle;
			ctx.fillStyle = para_upd.fillStyle;

			r = para_init.r;

			// 画线
			ctx.beginPath();
			ctx.arc(obj.x, obj.y, r, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.stroke();
			
			// 画填充
			ctx.beginPath();
			ctx.arc(obj.x, obj.y, r, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fill();
		},

		// 绘制直线
		drawLine = function(begin, end) {
			ctx.beginPath();
			ctx.moveTo(begin.x, begin.y);
			ctx.lineTo(end.x, end.y);
			ctx.closePath();
			ctx.stroke();
		},

		// 获得Canvas中的触摸位置
		getPos = function(event) {
			var rect = event.currentTarget.getBoundingClientRect();

			var pos = {
			    x: event.touches[0].clientX - rect.left,
			    y: event.touches[0].clientY - rect.top
			};
			
			return pos;
		},

		// 判断触摸点是否在圆内部
		arcIn = function(pos) {
			for (var i = 0, len = queue.length; i < len; i++) {
				if (Math.abs(pos.x - queue[i].x) < para_init.r && Math.abs(pos.y - queue[i].y) < para_init.r) {
					//返回匹配点的队列位置
					return i; 
				}
			}

			return -1;
		}

		// 设置密码
		setPwd = function() {		
			if (save.length < 5) {
				state.innerHTML = '密码太短，至少需要5个点';
				return;
			}

			// 第一次输入
			if (flag == 0) {
				pre_save = save.slice(0, save.length);

				state.innerHTML = '请再次输入手势密码';
				flag++;
				return;
			}

			// 第二次输入
			if (flag == 1) {
				//密码长度不一致
				if (pre_save.length != save.length) {
					state.innerHTML = '两次输入不一致'
					flag--;
					return;
				}

				// 密码内容不一致
				for (var i = 0, len = save.length; i < len; i++) {
					if (pre_save[i] != save[i]) {
						state.innerHTML = '两次输入不一致'
						flag--;
						return;
					}
				}

				// 更新LocalStorage
				if (window.localStorage) {
					localStorage.setItem('unlock_pwd', JSON.stringify(save));
				} else {
					alert('该浏览器不支持LocalStorage，请升级浏览器');
					return;
				}

				state.innerHTML = '密码设置成功';
				flag--;
				return;
			}
		},

		// 验证密码
		validatePwd = function() {
			// 读取LocalStorage
			if (window.localStorage) {
				if (localStorage.getItem('unlock_pwd')) {
					var pwd = JSON.parse(localStorage.getItem('unlock_pwd'));

					if (pwd.length != save.length) {
						state.innerHTML = '输入的密码不正确'
						return;
					}

					for (var i = 0, len = save.length; i < len; i++) {
						if (save[i] != pwd[i]) {
							state.innerHTML = '输入的密码不正确';
							return;
						}
					}

					state.innerHTML = '密码正确！';

				} else {
					state.innerHTML = '请先设置密码';
				}
			} else {
				alert('该浏览器不支持LocalStorage，请升级浏览器');
				return;
			}
		},

		// 触摸事件绑定
		bindCanvas = function() {
			canvas.addEventListener('touchstart', function(event) {
				var pos = getPos(event),
                      i = arcIn(pos);
				
				if (i != -1) {
					// 重绘当前圆
					updateCircle(queue[i]) 

					if (save.indexOf(i) == -1) {
						save.push(i);
					}
				} 
			});	

			canvas.addEventListener('touchmove', function(event) {
				// 清除一帧
				ctx.clearRect(0, 0, ctx.canvas.width, canvas.height);

				// 重绘初始化
				drawCircle();
				
				if (save.length == 0) {
			    	return;
			    }

				//重绘存入的点
				for (var i = 0, len = save.length; i < len; i++) {
					updateCircle(queue[save[i]]);
				} 

			    var pos = getPos(event),
			    	  i = arcIn(pos);

   		    	//起始点和终止点
   		    	var begin = {
   		    		x: queue[save[save.length - 1]].x,
   		    		y: queue[save[save.length - 1]].y
   		    	},
   	            end = {
   	        		x: pos.x,
   	        		y: pos.y
   	            };

		        if (i != -1) {
		        	// 重绘当前圆
		        	updateCircle(queue[i]); 

		        	if (save.indexOf(i) == -1) {
		        		save.push(i);
		        	}
		        }
		        
		        // 遍历队列位置，连接上一点和下一点
		        for (var i = 0, len = save.length; i < len; i++) {
		        	if (i == len - 1) {
		        		break;
		        	}

		        	drawLine(queue[save[i]], queue[save[i + 1]]);
		        }

		        drawLine(begin, end);
			});

			canvas.addEventListener('touchend', function(event) {
				// 清除一帧
				ctx.clearRect(0, 0, ctx.canvas.width, canvas.height);
				
				// 重绘初始化
				drawCircle();

				// 设置密码或验证密码
				if (save.length != 0) {
					if (set.checked) {
						setPwd();
					} else {
						validatePwd();
					}
				}

				// 清除队列
				save = [];
			});
		},

		// 表单事件绑定
		bindInput = function() {
			set.addEventListener('click', function() {
				state.innerHTML = '请输入手势密码';
			});

			validate.addEventListener('click', function() {
				state.innerHTML = '请验证密码';
			});
		},

		// 初始化
		init = function() {
			// 初始化Circle
			drawCircle();
			
			// 绑定事件
			bindCanvas();
			bindInput();
		};

	return {
		init: init
	};
})();

unlock.init();