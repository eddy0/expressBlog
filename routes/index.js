const { log } = require('../utils.js')
const express = require('express')
const Topic = require('../models/topic.js')
const User = require('../models/user.js')
const Tag = require('../models/tag.js')
const { currentUser, loginRequired } = require('./main.js')

const router = express.Router()

router.get('/', (req, res) => {
    let topics = Topic.all()
    topics = topics.map( (topic) => {
        let author = User.get(topic.uid)
        topic.author = author
        return topic
    })
    let tags = Tag.all()
    let u = currentUser(req)
    log('u', u)
    args = {
        topics: topics,
        tags: tags,
        user: u
    }
    res.render('index.html', args)
})

router.get('/topic/new', (req, res) => {
    let tags = Tag.all()
    let args = {
        tags: tags,
    }
    res.render('new.html', args)
})

router.get('/topic/:id',  loginRequired, (req, res) => {
    let id = Number(req.params.id)
    let topic = Topic.detail(id)
    let author = User.get(topic.uid)
    log('author', author)
    let tags = Tag.all()
    if (topic !== null){
        args = {
            topic: topic,
            tags: tags,
            author: author,
        }
        res.render('detail.html', args)
    } else{
        res.status(404).send('not found')
    }
})

router.get('/signup', (req, res) => {
    res.render('signup.html')
})

router.post('/signup', (req, res) => {
    res.render('signup.html')
})


router.get('/signin', (req, res) => {
    let nextUrl = req.query.nextUrl
    let args = {
        nextUrl: nextUrl || ''
    }
    res.render('signin.html', args )
})

router.post('/signin', (req, res) => {
    const form = req.body
    log('form', form)
    let valid = User.validLogin(form)
    log('valid')
    if (valid) {
        let u = User.findBy('username', form.username)
        req.session.uid = u._id
        let nextUrl = form.nextUrl || '/'
        res.redirect(nextUrl)
    } else {
        req.session.flash = {
            message: 'wrong username and password'
        }
        res.redirect('/signin')
    }
})

router.get('/logout', (req, res) => {
    req.session = null
    res.redirect('/')
})







module.exports = router
