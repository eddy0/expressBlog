const { log } = require('../utils.js')
const User = require('../models/user.js')



const currentUser = (request) => {
    let uid = request.session.uid
    let u = User.get(uid)
    if (u !== null){
        return u
    } else {
        u = User.guest()
        log('guest', u)
        return u
    }
}

const loginRequired = (req, res, next) => {
    const u = currentUser(req)
    if (u._id === -1){
        let baseUrl = '/signin'
        if (req.method === 'POST'){
            res.redirect(baseUrl)
        } else {
            let original = req.originalUrl
            let nextUrl = baseUrl + '?nextUrl='+ original
            res.redirect(nextUrl)
        }
    } else {
        next()
    }
}

module.exports = {
    currentUser: currentUser,
    loginRequired: loginRequired,
}