const { log } = require('../utils.js')
const express = require('express')
const path = require('path')
const multer = require('multer')
const uploadPath = 'uploads/'
const { calendarDate } = require('../filter')

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
    let args = {
        topics: topics,
        user: u
    }
    res.render('setting.html', args)
})

router.get('/:uid', loginRequired, (req, res) => {
    let u = currentUser(req)
    let id = Number(req.params.uid)
    let user = User.get(id)
    log('user',id, user)
    let createdTime = calendarDate(user.createdTime)
    let filteredUser = {
        uid: user._id,
        nickname: user.nickname,
        createdTime: createdTime,
        email: user.email,
        note: user.note,
        introduction: user.introduction,
    }
    if (user !== null) {
        let topics = Topic.all()
        topics = topics.filter( (topic) => {
            return topic.uid === user._id
        })
        let  args = {
            topics: topics,
            filteredUser: filteredUser,
            user: u,
        }
        res.render('profile.html', args)
    } else {
        res.status(404).send('not found')
    }
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
