const express = require ("express");
const app = express();
const PORT = 5000;

const http = require('http').Server(app);
const cors = require('cors')
const socketIO = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000'
    }
});


app.get('api', (req, res) => {
    res.json({
        message: 'hello'
    })
})

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user connnected`);

    socket.on('selectSeance', (data) => {
        socketIO.emit('selectSeanceResponse', data);
    })
    
    socket.on('lockSeat', (data) => {
        socketIO.emit('lockSeatResponse', data)
    })

    socket.on('buy', (data) => [
        socketIO.emit('buyResponse', data)
    ])

    socket.on('reserve', (data) => [
        socketIO.emit('reserveResponse', data)
    ])

    socket.on('unlock', (data) => [
        socketIO.emit('unlockResponse', data)
    ])
    
    socket.on('unlockAll', (data) => [
        socketIO.emit('unlockAllResponse', data)
    ])
    
    socket.on('returnTicket', (data) => [
        socketIO.emit('returnTicketResponse', data)
    ])

    socket.on('toMainPage', (data) => [
        socketIO.emit('toMainPageResponse', data)
    ])

    socket.on('disconnect', () => {
        console.log(`user ${socket.id} disconnect`)
    })
})

http.listen(PORT, () => {
    console.log("Server working");
})