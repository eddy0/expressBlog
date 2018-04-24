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
    tags = Tag.all()
    args = {
        topics: topics,
        tags: tags,
    }
    res.render('index.html', args)
})


module.exports = router
