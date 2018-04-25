const { log } = require('../utils.js')
const express = require('express')
const Topic = require('../models/topic.js')
const User = require('../models/user.js')
const Tag = require('../models/tag.js')

const router = express.Router()

router.get('/', (req, res) => {
    let topics = Topic.all()
    topics = topics.map( (topic) => {
        let author = User.get(topic.uid)
        topic.author = author
        return topic
    })
    let tags = Tag.all()
    args = {
        topics: topics,
        tags: tags,
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



router.get('/topic/:id', (req, res) => {
    let id = Number(req.params.id)
    let topic = Topic.get(id)
    let tags = Tag.all()
    if (topic !== null){
        args = {
            topics: topic,
            tags: tags,
        }
        res.render('detail.html', args)
    } else{
        res.status(404).send('not found')
    }
})



router.post('/new', (req, res) => {
    const form = req.body
})





module.exports = router
