const { log } = require('../utils.js')

const express = require('express')
const router = express.Router()
const { currentUser, loginRequired } = require('./main')
const { calendarDate } = require('../filter')



router.get('/', loginRequired, (req, res) => {
    let u = currentUser(req)
    let date = Date.now()
    date = calendarDate(date)
    let data = {
        user: u,
        date: date
    }

    req.io.on('connection', function (socket) {
        socket.broadcast.emit('new', data)
    })

    res.render('chat_mob.html',  {
        user: u,
    })
})

router.post('/add', (req, res) => {
    let msg = req.body.msg
    let u = currentUser(req)
    let args = {
        user: u,
        msg: msg
    }
    req.io.emit('message', args )
    res.json({success:true})
})



module.exports = router