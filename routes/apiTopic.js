const { log } = require('../utils.js')
const express = require('express')
const Topic = require('../models/topic.js')
const User = require('../models/user.js')
const Tag = require('../models/tag.js')
const { currentUser, loginRequired } = require('./main.js')

const router = express.Router()


router.post('/', (req, res) => {
    res.redirect('/')
})

router.post('/new', loginRequired, (req, res) => {
    const form = req.body
    const u = currentUser(req)
    form.author = u
    form.uid = u._id
    let m = Topic.create(form)
    let args = {
        success: true,
        message: '',
        data: m
    }
    res.json(args)
})




module.exports = router
