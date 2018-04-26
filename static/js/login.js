class AlertLogin extends Alert {
    constructor(args) {
        super(args)
        this.appendHtml()
        this.actionAlert()
    }

    PromptTemplate() {
        const t = (`
                    <div class="wd-login-title">
                        ${this.title}
                    </div>
                    <div class="wd-login-inputWrapper">
                        <input class="wd-login-input login-username" type="text" placeholder="${this.placeholder[0]}">
                        <input class="wd-login-input login-password" type="password" placeholder="${this.placeholder[1]}">
                    </div>
                    <div class="wd-login-btns">
                    <button class="wd-login-btn wd-login-submit">Sign In</button>
                    <button class="wd-login-btn wd-login-cancel">Cancel</button>
                    </div>
                    <div class="wd-login-signup">
                    <span>No account? </span>
                    <a href="">Create one.</a>
</div>
            `)
        return t
    }

    appendHtml() {
        const t = this.PromptTemplate()
        this.insertHtml(t)
    }

    actionAlert() {
        this.bindAll('.wd-login-btn', 'click', (event) => {
            console.log('clicked', this.container )
            this.container.classList.toggle('alert-show')
            if(this.has(event)('wd-login-submit')) {
                const username = this.e('.login-username')
                const password = this.e('.login-password')
                const val = {
                    username: username.value,
                    password: password.value
                }
                this.fire(true, val)
            } else if(this.has(event)('wd-login-cancel')) {
                this.fire(false)
            }
        })
    }
}

const successNotice = () => {
    AlertNotice.create({
        wrapperClass: 'notice',
        title: 'Success',
        notice: 'you have logged in',
        overlayColor: '#D7EFEE',
        wrapperColor: '#fff',
    })
}

const failNotice = () => {
    AlertNotice.create({
        title: 'Failed',
        notice: 'wrong username / password<br> pls try again!'
    })
}

const userTemplate = (user) => {
    let t  = `
    <div class="header-avatar">
                <img src="${user.avatar}" alt="">
                <div class="header-popover">
                        <ul class="wd-popover-list">
                            <li class="item">
                                <a href="/profile/${user._id}">
                                    <svg viewBox="0 0 20 20" width="14" height="16" aria-hidden="true" style="height: 16px; width: 14px;">
                                        <g>
                                            <path d="M13.4170937,10.9231839 C13.0412306,11.5757324 12.5795351,12.204074 12.6542924,12.7864225 C12.9457074,15.059449 18.2164534,14.5560766 19.4340179,15.8344151 C20,16.4286478 20,16.4978969 20,19.9978966 C13.3887136,19.9271077 6.63736785,19.9978966 0,19.9978966 C0.0272309069,16.4978969 0,16.5202878 0.620443914,15.8344151 C1.92305664,14.3944356 7.20116276,15.1185829 7.40016946,12.7013525 C7.44516228,12.1563518 7.02015319,11.5871442 6.63736814,10.9228381 C4.51128441,7.2323256 3.69679769,4.67956187e-11 10,9.32587341e-14 C16.3032023,-4.66091013e-11 15.4216968,7.4429255 13.4170937,10.9231839 Z"></path>
                                        </g>
                                    </svg>
                                    <span>Profile</span>
                                </a>
                            </li>
                            <li class="item"  data-action="logOut">
                                <a href="/logout">
                                    <svg viewBox="0 0 20 20" class="Icon Button-icon Icon--logout" width="14" height="16" aria-hidden="true" style="height: 16px; width: 14px;"><title></title>
                                        <g>
                                            <path d="M0 10C0 7.242 1.154 4.58 3.167 2.697c.51-.477 1.31-.45 1.79.06.475.51.45 1.31-.06 1.787C3.37 5.975 2.53 7.91 2.53 10c0 4.118 3.35 7.468 7.47 7.468 4.12 0 7.47-3.35 7.47-7.47 0-2.04-.81-3.948-2.28-5.37-.5-.485-.514-1.286-.028-1.788.485-.5 1.286-.517 1.79-.03C18.915 4.712 20 7.265 20 10c0 5.512-4.486 9.998-10 9.998s-10-4.486-10-10zm8.7-.483V1.26C8.7.564 9.26 0 9.96 0c.695 0 1.26.564 1.26 1.26v8.257c0 .696-.565 1.26-1.26 1.26-.698 0-1.26-.564-1.26-1.26z"></path>
                                        </g>
                                    </svg>
                                    <span>Logout</span>
                                </a>
                            </li>

                        </ul>
                    </div>

                </div>
    `
    return t
}

const renderLoginHtml = (data) => {
    let container = document.querySelector('.header-info')
    container.innerHTML = ''
    let t = userTemplate(data)
    appendHtml(container, t )
}

// const logoutTemplate = () => {
//     const t =
//         `
//         <div class="header-login">
//                 <a href="javascript:;" class="signIn" data-action="signIn">Sign in</a>
//                 <a href="/signup" class="signUp">Get Started</a>
//             </div>
//         `
//      return t
// }
//
// const renderLogoutHtml = () => {
//     let container = e('.header-info')
//     container.innerHTML = ''
//     let t = logoutTemplate()
//     appendHtml(container, t )
// }

const callbackSignIn = (confirm, value) => {
    if (confirm){
        let path = '/api/signin'
        new Ajax().post(path, value)
            .then( (data) => {
            if (data.success === true){
                successNotice()
                renderLoginHtml(data.data)
            } else{
                failNotice()
            }
        })
    }
}

const signInTrigger = () => {
    AlertInput.create({
        title: 'Welcome Back',
        input: [ {
            name: 'username',
            placeholder: 'username',
            type: 'text',
        },
            {
                name: 'password',
                placeholder: 'password',
                type: 'password',
            },
        ]
    }).on(callbackSignIn)
}

const signOutTrigger = () => {
    log('in')
    renderLogoutHtml()
    // new AJax().post('/logout')
    // l.get('/logout').then( (data) => {
    //     console.log('data', data)
    // })
}

const ToggleUserInfo = () => {
    let wrapper = e('.header-info')
    const popover = e('.header-popover', wrapper)
    popover.classList.add('show-user')
    popover.focus()
    popover.addEventListener('focusout', (event) => {
        setTimeout( () => {
            popover.classList.remove('show-user')
        }, 150)
    })
}

const actionFromPopover = (self) => {
    const item = self.closest('.item')
    if (item !== null){
        let action = item.dataset.action
        return action
    }
}

const loginEvent = () => {
    const container = e('.header-info')
    let actions = {
        'avatar': ToggleUserInfo,
        'signIn':signInTrigger,
        'logOut':signOutTrigger,
    }

    container.addEventListener('click', (event) => {
        const self = event.target
        let action = self.dataset.action
        if (action === undefined){
            action = actionFromPopover(self)
        }
        if (action in actions){
            actions[action](self)
        }
    })
}

loginEvent()