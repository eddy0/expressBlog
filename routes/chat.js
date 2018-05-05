const { log } = require('../utils.js')

const express = require('express')
const router = express.Router()
const { currentUser } = require('./main')



router.get('/', (req, res) => {
    let u = currentUser(req)

    io.on('connection', function (socket) {
        socket.broadcast.emit('hi', u.username)
    })

    res.render('chat.html')
})



module.exports = router