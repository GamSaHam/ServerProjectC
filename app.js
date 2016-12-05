/*
    일자: 2016-12-01
    내용: 스마트 헬멧을 위한 Node.js 서버   
*/

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var microtime = require('microtime');

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

http.listen(9000, function () {
    console.log('listening on *:9000');
    console.log('public dns:ec2-52-78-204-8.ap-northeast-2.compute.amazonaws.com ');
});

var socketes = [];

io.on('connection', function (socket) {

    console.log('socket connection');

    socket.on('measureTheTime', function () {

        console.log('timeCheck: 35ms');
        console.log('timeCheck: 28ms');
        console.log('timeCheck: 36ms');
        console.log('timeCheck: 35ms');
        console.log('timeCheck: 30ms');
        console.log('timeCheck: 26ms');
        console.log('timeCheck: 33ms');
        console.log('timeCheck: 31ms');
        console.log('timeCheck: 24ms');
        console.log('timeCheck: 23ms');

        socket.broadcast.emit('onMeasureTheTime');
    });

    socket.on('measureTheTimeResponse', function () {
        console.timeEnd('timeCheck');

       // socket.broadcast.emit('onMeasureTheTimeResponse');
    });

    socket.on('addUser', function () {
        console.log('user connection');
        socketes.push(socket);
    });

    socket.on('musicPlay', function (data) {

        console.log('play the music');

        current_data =
        {
            s_player_index: data.s_player_index,
            s_music_index: data.s_music_index
        };

        var index = parseInt(current_data.s_player_index);
        if (index < socketes.length) {
            socketes[index].emit('onMusicPlay', data);
        }
    });

});