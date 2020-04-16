const express = require('express')
const app = express()
const server = require('http').createServer(app)
server.listen(3000)
let io = require('socket.io').listen(server)


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

users = []
connections = []

io.sockets.on('connection', function (socket) {
    console.log('Succes')

    connections.push(socket)

    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket), 1)
        console.log('disconnect')
    })

    socket.on('send mess', function (data) {
        io.sockets.emit('add mess', { msg: data.message, name: data.name, className: data.className })
    })

})