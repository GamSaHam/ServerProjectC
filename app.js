/*
	1. Socket.IO 유니티와 통신 예제


    //커맨드 창으로 npm install socket.io 설치
*/

var io = require('socket.io')({
    transports: ['websocket'],
});

io.attach(4567);

var clients = [];

io.on('connection', function (socket) {
    // nodejs 에서 받는쪽 socket.on(param) 
    socket.on('addClient', function (data) {
        addClient(data);
    });

    socket.on('broadcast', function (data) {
        // 자신을 제외한 다른 연결된 유저
        socket.broadcast.emit('score', currentUser);

        // 통신을 한쪽에게 다시 포스트
        socket.emit('score', currentUser);
    });

    socket.on('removeClient', function (data) {

        removeClient(data);


    });

    // TODO

    socket.on('soundPlay', function (data) {

        //removeClient(data);

        current_data =
            {
                id: data.id,
                music_index: data.music_index
            };

        console.log('soundPlay');
        socket.broadcast.emit('soundPlay', current_data);

    });




})

function addClient(data) {
    currentUser =
        {
            id: data.id,

        }

    // 추가
    clients.push(currentUser);

    console.log('addClient');
}

function removeClient(data) {
    for (var i = 0; i < clients.length; i++) {
        var currentClient = clients[i];

        if (currentClient.id == data.id) {
            clients.splice(i, 1);
            console.log("client remove" + i);

            return true;
        }
    }


    return false;
}


console.log('server is started');