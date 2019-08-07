var uuidv1 = require('uuidv1')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
const servers = {};

// TODO maybe need http calls
app.get('/', function (req, res) {
    res.send('Welcome to game');
});

io.on('connection', function (socket) {
    socket.on('createServer', function (playerName, serverName) {
        const id = uuidv1();

        servers[serverId] = {
            serverName
        };
        servers[id].player1 = {
            socket,
            playerName
        };
        socket.emit('serverCreated', id);
    });

    socket.on('getServerList', function () {
        const serverList = Object.keys(servers).map((serverId) => {
            if (!servers[serverId].player2) {
                return {
                    serverId,
                    serverName: servers[serverId].player1.name
                }
            }
        });
        socket.emit('serversLsit', serverList);
    });

    socket.on('connectServer', function (playerName, serverId) {
        if (servers[serverId].player2) {
            socket.emit('connectionFail', 'player 2 alredy exist');
        } else {
            servers[serverId].player2 = {
                socket,
                playerName
            }
            servers[serverId].player1.socket.emit('startGame', { player2: his.servers[serverId].player2.name });
            servers[serverId].player2.socket.emit('startGame', { player1: his.servers[serverId].player1.name });
        }
    });

    socket.on('play', function (serverId, sendTo, data) {
        servers[serverId][sendTo].socket.emit('game', data);
    });

    socket.on('result', function (serverId, sendTo, result) {
        servers[serverId][sendTo].socket.emit('result', result);
    });

    socket.on('disconnectServer', function (serverId) {
        servers[serverId].player1.socket.emit('disconnectServer');
        servers[serverId].player2.socket.emit('disconnectServer');
        delete servers[serverId];
    })
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});