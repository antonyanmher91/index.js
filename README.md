===========EMMIT EVENTS===========

'connection' - For connect to server
'createServer' - For create game server (send (playerName, serverName))
'getServerList' - For get all in wait mode servers
'connectServer' - For connect to server (send (playerName, serverId))
'play' - for play current step (send (serverId, sendTo, data))
    DATA EXAMPLE
    {
        x: 'number'
        y: 'number'
    }
'result' - for send result afgter play current step (send (serverId, sendTo('player1 or 'player2'), data))
    RESULT DATA EXAMPLE
    {
        step: 'bool'
    }
'disconnectServer' - for disconnect (send (serverId))



===========LISTEN EVENTS===========

'serverCreated' - Wait server id
'serversLsit' - Wait server list
    SERVER LIST EXAMPLE
    [
        {
            serverName: 'string',
            serverId: 'string'
        }
    ]

'connectionFail' - Wait connection fail message
'startGame' - Wait next player name
'game' - Wait current game step data (see 'play' example)
'result' - Wait current step game result (see 'result' example)
'disconnectServer' - Wait with disconnect server