const { log } = require('../utils.js')
const express = require('express')
const path = require('path')
const multer = require('multer')
const uploadPath = 'uploads/'

const upload = multer({
    dest: uploadPath,
    limits: {fileSize: 2048000},
})

const Topic = require('../models/topic.js')
const User = require('../models/user.js')
const Tag = require('../models/tag.js')
const { currentUser, loginRequired } = require('./main.js')

const router = express.Router()

const uploadFilter = (req, res, next) => {
    let file = upload.single('avatar')
    let args
    file(req, res, (error) => {
        if (error) {
            console.log('error',error)
            args = {
                message: 'the file was too big',
                success: false,
                data: [],
            }
        } else {
            const avatar = req.file
            args = {
                message: '',
                success: true,
                data: avatar.filename,
            }
        }
        res.json(args)
    })
}

router.post('/upload/avatar', loginRequired,  (req, res) => {
    let uploadFilter = upload.single('avatar')
    let args
    uploadFilter(req, res, (error) => {
        if (error) {
            args = {
                message: 'the file was too big',
                success: false,
                data: [],
            }
        } else {
            const avatar = req.file
            args = {
                message: '',
                success: true,
                data: avatar.filename,
            }
            let type = ['image/png','image/jpeg', 'image/gif' ]
            if (!type.includes(avatar.mimetype)) {
                args = {
                    message: 'only png/jpeg/gif type are allowed',
                    success: false,
                    data: [],
                }
            }
        }
        res.json(args)
    })
})

router.post('/setting', loginRequired,  (req, res) => {
    let form = req.body
    log(req.body)
    let u = currentUser(req)
    u = Object.assign(u, form)
    u.save()
    let args = {
        message: '',
        success: true,
        data: u,
    }
    res.json(args)
})




module.exports = router
