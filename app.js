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
});

var socketes = [];

io.on('connection', function (socket) {

    console.log('connection');

    socket.on('sendPacket', function (data) {

        var current_data =
        {
            s_current_ms: data.s_current_ms
        };

        console.log(current_data.s_current_ms);
        console.log(microtime.now());



    });


    socket.on('addUser', function () {
        console.log('add user');
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

        socketes[index].emit('onMusicPlay', data);
    });

});