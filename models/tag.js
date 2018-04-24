const Model = require('./main.js')
const { log, random } = require('../utils.js')



class Tags extends Model {
    constructor(form={}) {
        super(form)
        this.name = form.name || 'front-end'
    }

}

module.exports = Tags


const test = () => {
    let form = {
        name: 'block-chain',
    }
    // let t = Topic.all()
    let t = Tags.create(form)
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
