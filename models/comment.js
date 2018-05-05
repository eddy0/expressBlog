const Model = require('./main.js')
const { log, random } = require('../utils.js')



class Comment extends Model {
    constructor(form={}) {
        super(form)
        this.content = form.content || ''
        this.topicId = form.topicId || -1
        this.uid = form.uid || -1
        this.stars = form.stars || 0
        this.replyToId = form.replyToId || undefined
    }

    isAuthor() {
        const User = require('./user.js')
        const Topic = require('./topic.js')
        let topic = Topic.get(this.topicId)
        let author = topic.uid
        if (author === this.uid) {
            return true
        } else {
            return false
        }
    }

    replyTo() {
        const User = require('./user.js')
        if (this.replyToId === undefined) {
            return User.guest()
        } else {
            const comment = Comment.get(this.replyToId)
            let uid = comment.uid
            let u = User.get(uid)
            return u
        }
    }


    user(uid) {
        const User = require('./user.js')
        const u = User.get(uid)
        return u
    }
}

module.exports = Comment

