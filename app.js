const { log } = require('./utils.js')

const express = require('express')
const bodyParser = require('body-parser')
const session = require('cookie-session')
const nunjucks = require('nunjucks')
const path = require('path')

const app = express()


const configTemplate = () => {
    const env = nunjucks.configure('templates', {
        express: app,
        noCache: true,
        autoescape: true,
        watch: true,
    })

    env.addFilter('formattedTime', (date) => {
        let { formattedTime } = require('./filter.js')
        let f = formattedTime(date)
        return f
    })

    env.addFilter('calendarDate', (date) => {
        let { calendarDate } = require('./filter.js')
        let f = calendarDate(date)
        return f
    })
}

const registerRouter = () => {
    const index = require('./routes/index.js')
    app.use('/', index)

    const apiTopic = require('./routes/apiTopic.js')
    app.use('/api/topic/', apiTopic)
}

const configApp = () => {

    app.use(bodyParser.urlencoded({
        extended: true
    }))

    app.use(bodyParser.json())

    app.use(session({
        secret: 'key',
        }
    ))

    app.use('/static', express.static(path.join(__dirname, 'static')))

    configTemplate()


    registerRouter()
}

const run = (port=3000, host) => {
    const server = app.listen(port, host, () => {
        const address = server.address()
        log('app listening', `http://localhost:${address.port}`)
    })
}


if (require.main === module){
    configApp()
    let host = '0.0.0.0'
    let port = 7000
    run(port, host )
}
