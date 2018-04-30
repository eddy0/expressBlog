const { log } = require('../utils.js')
const express = require('express')
const Topic = require('../models/topic.js')
const User = require('../models/user.js')
const Tag = require('../models/tag.js')
const { currentUser, loginRequired } = require('./main.js')

const router = express.Router()

router.get('/', (req, res) => {
    let u = currentUser(req)
    let topics = Topic.all()
    topics = topics.map( (topic) => {
        let author = User.get(topic.uid)
        topic.author = author
        topic.star_status = ''
        topic.mark_status = ''
        if (topic.marked.includes(u._id)) {
            topic.mark_status = 'marked'
        }

        if (topic.starred.includes(u._id)) {
            topic.star_status = 'starred'
        }

        return topic
    })
    let tags = Tag.all()
    args = {
        topics: topics,
        tags: tags,
        user: u
    }
    res.render('index.html', args)
})

router.get('/topic/tag/:tag', (req, res) => {
    let tag = req.params.tag
    let u = currentUser(req)
    let topics = Topic.all()
    topics = topics.filter( (topic) => {
        let tags = topic.tags
        return tags.includes(tag)
    })
    topics = topics.map( (topic) => {
        let author = User.get(topic.uid)
        topic.author = author
        topic.star_status = ''
        topic.mark_status = ''
        if (topic.marked.includes(u._id)) {
            topic.mark_status = 'marked'
        }
        if (topic.starred.includes(u._id)) {
            topic.star_status = 'starred'
        }
        return topic
    })
    let tags = Tag.all()
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
    let u = currentUser(req)
    let tags = Tag.all()
    let topic = Topic.detail(u, id)
    let author = User.get(topic.uid)
    topic.star_status = ''
    topic.mark_status = ''
    if (topic.marked.includes(u._id)) {
        topic.mark_status = 'marked'
    }
    if (topic.starred.includes(u._id)) {
        topic.star_status = 'starred'
    }
    if (topic !== null){
        args = {
            topic: topic,
            tags: tags,
            author: author,
            user: u,
        }
        res.render('detail.html', args)
    } else{
        res.status(404).send('not found')
    }
})

router.get('/signup', (req, res) => {
    let nextUrl = req.query.nextUrl || '/'
    res.render('signup.html', {
        nextUrl: nextUrl,
    })
})

router.post('/signup', (req, res) => {
    let form = req.body
    log('form', form)
    let u = User.register(form)
    log('u', u)
    if (u !== null) {
        let nextUrl = form.nextUrl || '/'
        req.session.uid = u._id
        res.redirect(nextUrl)
    } else {
        req.session.flash = {
            message: 'invalid username and password'
        }
        res.redirect('/signup')
    }
})

router.get('/signin', (req, res) => {
    let nextUrl = req.query.nextUrl
    let args = {
        nextUrl: nextUrl || ''
    }
    res.render('signin.html', args )
})

router.post('/signin', (req, res) => {
    let form = req.body
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
            message: 'invalid username and password'
        }
        let nextUrl = req.query.nextUrl || '/signin'

        res.redirect('/signin', {
            nextUrl: nextUrl
        })
    }
})

router.get('/logout', (req, res) => {
    req.session = null
    res.redirect('/')
})







module.exports = router
