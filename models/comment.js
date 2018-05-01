const Model = require('./main.js')
const { log, random } = require('../utils.js')



class Comment extends Model {
    constructor(form={}) {
        super(form)
        this.content = form.content || ''
        this.topicId = form.topicId || -1
        this.uid = form.uid || -1
        this.stars = form.stars || 0
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


    user(uid) {
        const User = require('./user.js')
        const u = User.get(uid)
        return u
    }
}

module.exports = Comment

