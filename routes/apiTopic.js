const { log } = require('../utils.js')
const express = require('express')
const Topic = require('../models/topic.js')
const User = require('../models/user.js')
const Tag = require('../models/tag.js')

const router = express.Router()


router.post('/', (req, res) => {
    log('post', req.originUrl)
    res.redirect('/')
})

router.post('/new', (req, res) => {
    const form = req.body
    let m = Topic.create(form)
    let args = {
        success: true,
        message: '',
        data: m
    }
    res.json(args)
})




module.exports = router
