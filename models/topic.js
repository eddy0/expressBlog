const Model = require('./main.js')
const { log, random } = require('../utils.js')



class Topic extends Model {
    constructor(form={}) {
        super(form)
        this.title = form.title || ''
        this.tags = form.tags || []
        this.content = form.content || ''
        this.views = form.views || 0
        this.comments = form.comments || 0
        this.uid = form.uid || -1
        this.author = form.author || {}
        this.brief = form.brief || this.content
        this.marked = form.marked || []
        this.starred = form.starred || []
        this.stars = form.stars || 0
        this.marks = form.marks || 0

    }

    static create(form) {
        const { content } = form
        let len = random()
        form.brief = content.slice(0, len) + '...'
        let m = super.create(form)
        return m
    }

    static detail(user, id) {
        const m = super.get(id)
        if (m.uid === user._id) {
            m.views += 1
            m.save()
        }
        return m
    }

    static action(id, uid, type) {
        const topic = super.get(id)
        if (topic !== null) {
            let action =  topic[type]
            let index = action.findIndex( (a) => {
                return a === uid
            })
            if (index === -1) {
                topic[type].push(uid)
            } else {
                topic[type].splice(uid)
            }
        }
        topic.save()
        return m
    }

    static AllList(tagId) {
         let ms = super.all()
        if (tagId === -1) {
             return ms
        } else {
             ms = ms.map( (m) => {
                 tags = m.tagsId
                 let index = tags.find( (tag) => {
                     return tag === tagId
                 })
                 if (index > -1){
                     return m
                 }
             })
            return ms
        }
    }

    user(uid) {
        const User = require('./user.js')
        const u = User.get(uid)
        return u
    }
}

module.exports = Topic

const test = () => {
    let form = {
        title: 'how to write a frong end document',
        tags: ['front-end', 'back-end'],
        content: 'how to wrw to wrihow to wrihow to wrihow to wrihow to wrihow to wrihow to wri',
        uid: 1,
    }
    // let t = Topic.all()
    let t = Topic.create(form)
    // let t = Topic.validLogin(form)
    // tt.name='gua'
    // t.save()
    // let t = Topic.get(1)
    // t.activated = false
    // t.save()
    // let s = Topic.get(5)
    // s.name='osok'
    // let s = Topic.findBy('edd', 'e')
    // t.save()
    log(t)
}

// test()