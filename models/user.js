const Model = require('./main.js')
const crypto = require('crypto')
const { log } = require('../utils.js')

class User extends Model {
    constructor(form={}) {
        super(form)
        this.username = form.username || ''
        this.email = form.email || ''
        this.password = form.password || ''
        this.note = form.note || 'nothing is noting'
        this.avatar = form.avatar || 'default.img'
        this.role = form.role || 2
    }

    static create(form) {
        let pwd = Number(form.password)
        form.password = this.saltedPassword(pwd)
        const u = super.create(form)
        return u
    }

    static saltedPassword (password, salt='123') {
        let pwd = password + salt
        const hash = crypto.createHash('sha256')
        hash.update(pwd)
        const h = hash.digest('hex')
        return h
    }

    static validLogin(form) {
        const {username, email, password} = form
        const pwd = this.saltedPassword(password)
        const u = this.findBy('username', username)
        log(u, pwd)
        return u !== null && u.password === pwd
    }

    static register(form) {
        const {username, email, password} = form
        log('form', form)
        const uniqueUser = this.findBy('username', username) === null
        // const uniqueEmail = this.findBy('email', username) === null
        const validForm = username.length > 3 && password > 3
        if (uniqueUser && validForm){
            let u = this.create(form)
            return u
        } else {
            return null
        }
    }

    static guest() {
        let form = {
            _id: -1,
            role: -1,
            username: 'guest',
            note: 'please join us'
        }
        let m = User.create(form)
        return m
    }
}

module.exports = User

const test = () => {
    let form = {
        username:'gua1237',
        password: '123',
    }
    // let m = User.all()
    // let m = User.create(form)
    let m = User.register(form)

    // let m = User.validLogin(form)
    // m.name='gua'
    // m.save()
    // let m = User.get(1)
    // m.activated = false
    // m.save()
    // let s = User.get(5)
    // s.name='osok'
    // let s = User.findBy('edd', 'e')
    // m.save()
    log(m)
    // log(s)
}

// test()
