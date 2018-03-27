var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

//在线用户
var onlineUsers = [];
//当前在线用户
var onlineCount = 0;

io.on('connection', function(socket) {

	//监听用户加入
	socket.on('login', function(username) {
		//设定用户标识
		socket.name = username;

		//检查在线列表，不在就加入
		if (onlineUsers.indexOf(username) == -1) {
			onlineUsers.push(username);
			onlineCount++;
		}

		//广播用户加入消息
		io.emit('login', {onlineUsers, onlineCount, name:username});
		console.log(username + '加入了群聊');
		console.log(username);
	});

	//监听发送的消息
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});

	//监听用户退出
	socket.on('disconnect', function() {
		console.log('A user exit');
		if (onlineUsers.indexOf(socket.name) != -1) {
			
			onlineUsers.splice(onlineUsers.indexOf(socket.name), 1);
			onlineCount--;
		}

		var name = socket.name;

		//广播用户退出消息
		io.emit('logout', {onlineUsers, onlineCount, name});
		console.log(name + '退出了群聊');
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
