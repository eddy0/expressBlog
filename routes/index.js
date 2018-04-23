const { log } = require('../utils.js')
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    log('request', req.body)
    res.render('index.html')
})


module.exports = router
