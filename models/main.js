const fs = require('fs')
const path = require('path')
const { log } = require('../utils.js')


const ensureExist = (path) => {
    let exist = fs.existsSync(path)
    if (!exist){
        let data = '[]'
        fs.writeFileSync(path, data)
    }
}

const load = (path) => {
    ensureExist(path)
    const options = {
        encoding: 'utf8'
    }
    let data = fs.readFileSync(path, options)
    data = JSON.parse(data)
    return data
}

const saveFile = (path, data) => {
    data = JSON.stringify(data, null, 2)
    fs.writeFileSync(path, data)
}



class Model{
    constructor(form) {
        this.createdTime = form.createdTime || Date.now()
        this.updatedTime = form.updatedTime || Date.now()
        this._id = Number(form._id) || undefined
        this.activated = form.activated || true
    }

    static _dbPath() {
        let cls = this
        const name = cls.name.toLowerCase()
        const p = path.join(__dirname, '../db', `${name}.json`)
        return p
    }

    static _newFromMapper(m) {
            return new this(m)
    }

    static _filterMapper(m) {
        if (m.activated){
            return new this(m)
        }
    }

    static _all() {
        const path = this._dbPath()
        const models = load(path)
        let ms = models.map( (m) => {
            return this._newFromMapper(m)
        })
        return ms
    }

    static all() {
        const path = this._dbPath()
        const models = load(path)
        let ms = models.map( (m) => {
            return this._filterMapper(m)
        })
        return ms
    }

    static create(form={}, args={}) {
        let m = new this(form)
        Object.keys(args).forEach( (k) => {
            m[k] = args[k]
        })
        m.save()
        return m
    }

    save() {
        // 修改数据要保存  新增数据也要保存
        const cls = this.constructor
        const models = cls._all()
        if (this._id === undefined) {
            let len  = models.length
            if (len > 0) {
                let _id = models.slice(-1)[0]._id + 1
                this._id = _id
            } else {
                this._id = 1
            }
            models.push(this)
        } else {
            let index = models.findIndex( (m) => {
                return m._id === this._id
            })
            if (index > -1){
                models[index] = this
            }
        }
        const path = cls._dbPath()
        saveFile(path, models)
    }

    static findBy(key, value) {
        const models = this.all()
        let m = models.find( (m) => {
            if (m !== undefined){
               return  m[key] === value
            }
        })
        m = m || null
        return m
    }

    static findAll(key, value) {
        const models = this.all()
        let m = models.filter( (m) => {
            if (m !== undefined){
                return m[key] === value
            }
        })
        return m
    }

    static get(id) {
        return this.findBy('_id', id)
    }

    static remove(id) {
        let m = this.get(id)
        if(m !== null) {
            m.activated = false
            m.save()
        }
        return m
    }

    toString() {
        const s = JSON.stringify(this)
        return s
    }

}

module.exports = Model


const test = () => {
    let form = {
        name:'gua1234567',
    }
    // let m = Model.all()
    // let m = Model.create(form)
    // m.name='gua'
    // m.save()
    // let m = Model.get(1)
    // m.activated = false
    // m.save()
    // let s = Model.get(5)
    // s.name='osok'
    // let s = Model.findBy('edd', 'e')
    // m.save()
    // log(m)
    // log(s)

}

// test()