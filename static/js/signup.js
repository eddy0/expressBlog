
const unique = (input) => {
    let typed = true

    input.addEventListener('input', (event) => {
        let time = Date.now()
        let timebox = time
    })
}

const validUsername = (s) => {
    let status = {
        start: true,
        end: true,
        min: true,
        max: true,
        type: true,
    }
    let letter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let number = '0123456789'
    let special = '_'
    let rules = letter + number + special
    if (!letter.includes(s[0])) {
        status.start = false
    }
    if (!(letter + number).includes(s[s.length - 1])) {
        status.end = false
    }
    if (s.length < 3 ) {
        status.min = false
    }
    if (s.length > 10) {
        status.max = false
    }
    for (let i = 0; i < s.length; i++) {
        if (!rules.includes(s[i])) {
            status.type = false
        }
    }
    return status
}

const UniqueUsername = (username) => {
    let form = {
        username: username,
    }
    return new Ajax().post('/api/valid', form)
}

// const validPassword = (s) => {
//     let status = {
//         min: true,
//         max: true,
//         type: true,
//     }
//
//     let letter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//     let number = '0123456789'
//     let special = '_'
//     let rules = letter + number + special
//     if (s.length < 3 ) {
//         status.min = false
//     }
//     if (s.length > 10) {
//         status.max = false
//     }
//     for (let i = 0; i < s.length; i++) {
//         if (!rules.includes(s[i])) {
//             status.type = false
//         }
//     }
//     return status
// }

const preventDefault = (event) => {
    event.preventDefault()
}

const allowSubmit = () => {
    let hints = es('.wd-hint')
    let button = e('.wd-login-btn')
    for (let i = 0; i < hints.length; i++ ) {
        let h = hints[i]
        if (!h.classList.contains('valid')) {
            button.addEventListener('click', preventDefault)
            button.classList.add('prevent')
            return
        }
    }
    button.classList.remove('prevent')
    button.removeEventListener('click', preventDefault)
}

const submitEvent = () => {
    if (input.classList.contains('login-username') && status.valid === true){
        UniqueUsername(val)
            .then((data) => {
                if (data.success){
                    status = {
                        valid: true,
                        hint: data.message,
                    }
                    area.classList.add('valid')
                } else {
                    status = {
                        valid: false,
                        hint: data.message,
                    }
                }
                area.innerText = status.hint
            })

    } else {
        area.classList.remove('valid')
    }
    allowSubmit()

}

const validate = (input) => {
    let name = input.name
    let val = input.value
    let status = validUsername(val)
    const area = e(`.wd-${name}-valid`)
    const items = es('.item')
    for (let i = 0; i < items.length; i++ ) {
        let item = items[i]
        let action = item.dataset.action
        if (status[action]){
            item.classList.add('valid')
        } else {
            item.classList.remove('valid')
        }
    }
}

// const signUpMapper = () => {
//     let mapper = {
//         'login-username': validUsername,
//         'login-password': validPassword,
//     }
//     return mapper
// }


const inputHandler = (event, callback) => {
    let mapper = ['login-username', 'login-password']
    const self = event.target
    let has = self.classList.contains.bind(self.classList)
    for (let key of mapper) {
        if (has(key)){
            callback(self)
        }
    }
}

const signUpEvent = () => {
    let mapper = ['login-username', 'login-password']

    bindAll('wd-login-input', 'click', (event) => {
        const self = event.target
        let has = self.classList.contains.bind(self.classList)
        for (let key of mapper) {
            if (has(key)){
                let div = key.slice(6)
                removeClassAll('active')
                let hint = e(`.wd-${div}-valid`)
                hint.classList.add('active')
            }
        }
    })

    bindAll('wd-login-input', 'input', (event) =>{
        const self = event.target
        log('self', event)
        let has = self.classList.contains.bind(self.classList)
        for (let key of mapper) {
            if (has(key)){
                validate(self)
            }
        }
    })
}

const showHint = () => {

}

const signUpMonitor = () => {
    showHint()
    signUpEvent()
}

signUpMonitor()
