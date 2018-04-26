
const validUsername = (s) => {
    let status = { valid: true, hint: '检查合格'  }
    let letter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let number = '0123456789'
    let special = '_'
    let rules = letter + number + special
    if (!letter.includes(s[0])) {
        status = { valid: false, hint: '只能字母开头', }
    }
    if (!(letter + number).includes(s[s.length - 1])) {
        status = { valid: false, hint: '只能字母或数字结尾', }
    }
    if (s.length < 3 ) {
        status = { valid: false, hint: '最小长度3', }
    }
    if (s.length > 10) {
        status = { valid: false, hint: '最大长度10', }
    }
    for (let i = 0; i < s.length; i++) {
        if (!rules.includes(s[i])) {
            status = { valid: false, hint: '只能包含字母、数字、下划线', }
        }
    }
    return status
}

const validPassword = (s) => {
    let status = { valid: true, hint: '检查合格'  }
    let letter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let number = '0123456789'
    let special = '_'
    let rules = letter + number + special
    if (s.length < 3 ) {
        status = { valid: false, hint: '最小长度3', }
    }
    if (s.length > 10) {
        status = { valid: false, hint: '最大长度10', }
    }
    for (let i = 0; i < s.length; i++) {
        if (!rules.includes(s[i])) {
            status = { valid: false, hint: '只能包含字母(大小写敏感)、数字、下划线', }
        }
    }
    return status
}

const UniqueUsername = (username) => {
    let form = {
        username: username,
    }
    return new Ajax().post('/api/valid', form)
        .then((data) => {
            console.log(data)
        })
}

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

const hintByMonitor = (input) => {
    let name = input.name
    let action = {
        username: validUsername,
        password: validPassword,
    }
    const area = e(`.wd-${name}-valid`)
    input.addEventListener('keyup', (event) => {
        let val = input.value
        let status = {valid: false}
        status = action[name](val)
        if (status.valid === true){
            log('valid')
            UniqueUsername(val)
                .then((valid) => {
                    if (valid){
                        status = {
                            valid: valid,
                            hint: 'you can use this username!'
                        }
                        area.classList.add('valid')
                    } else {
                        status = {
                            valid: valid,
                            hint: 'username already exists'
                        }
                    }

                })
        } else {
            area.classList.remove('valid')
        }
        area.innerText = status.hint
        allowSubmit()
    })
}

const signUpUsername = (input) => {
}

const signUpPassword = () => {
    const area = e('.wd-password-valid')

}

const signUpMapper = () => {
    let mapper = {
        'login-username': signUpUsername,
        'login-password': signUpPassword,
    }
    return mapper
}

const signUpEvent = () => {
    let mapper = signUpMapper()
    bindAll('wd-login-input', 'click', (event) =>{
        const self = event.target
        let has = self.classList.contains.bind(self.classList)
        for (let key in mapper) {
            if (has(key)){
                hintByMonitor(self)
                // mapper[key](self)
            }
        }
    })
}

const signUpMonitor = () => {
    signUpEvent()
    UniqueUsername()
}

signUpMonitor()
