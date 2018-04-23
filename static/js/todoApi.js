/*
let api = new Ajax()
api.all().then()

get(path)
post(path, data)
all()
add(data)
update(id, data)
remove(id)

*/


class Ajax {
    constructor() {
        this.baseUrl = 'https://localhost:6000/api'
    }

    ajaxpro({method, path, headers, data}) {
        method = method || 'GET'
        path = path || '/'
        headers = headers || 'application/json'
        data = data || {}
        let url = this.baseUrl + path
        let promise = new Promise((resolve, reject) => {
            const r = new XMLHttpRequest()
            r.open(method, url, true)
            r.setRequestHeader('Content-Type', headers)
            r.onreadystatechange = () => {
                if(r.readyState === 4) {
                    resolve(r.response)
                }
            }
            r.onerror = () => {
                reject(r)
            }

            data = JSON.stringify(data)
            r.send(data)
        })
        return promise
    }
}

class TodoApi extends Ajax {

    get(path, headers) {
        let method = 'GET'
        return this.ajaxpro({
            method: method,
            path: path,
            headers: headers,
        })
    }

    post(path, data, headers) {
        let method = 'POST'
        return this.ajaxpro({
            method: method,
            path: path,
            data: data,
            headers: headers,
        })
    }

    all() {
        let path = '/all'
        return this.get(path)
    }

    add(data) {
        let path = '/add'
        return this.post(path, data)
    }

    update(id, data) {
        let path = '/update/' + String(id)
        return this.post(path, data)
    }

    remove(id) {
        let path = '/delete/' + String(id)
        return this.get(path)
    }
}
