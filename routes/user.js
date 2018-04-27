const { log } = require('../utils.js')
const express = require('express')
const path = require('path')
const multer = require('multer')
const uploadPath = 'uploads/'

const upload = multer({
    dest: uploadPath,
})

const Topic = require('../models/topic.js')
const User = require('../models/user.js')
const Tag = require('../models/tag.js')
const { currentUser, loginRequired } = require('./main.js')

const router = express.Router()

router.get('/setting', loginRequired, (req, res) => {
    let u = currentUser(req)
    let topics = Topic.all()
    topics = topics.filter( (topic) => {
        return topic.uid === u._id
    })
    args = {
        topics: topics,
        user: u
    }
    res.render('setting.html', args)
})


router.get('/avatar/:avatar', loginRequired, (req, res) => {
    let filename = req.params.avatar
    let p = uploadPath + filename
    p = path.resolve(p)
    res.sendFile(p)
})

router.post('/upload/avatar', loginRequired, upload.single('avatar'),  (req, res) => {
    const u = currentUser(req)
    const avatar = req.file
    u.avatar = avatar.filename
    u.save()
    res.redirect(`/user/setting`)
})




module.exports = router
