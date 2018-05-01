

const commentSubmit = () => {
    const button = e('.wd-comment-btn')
    button.addEventListener('click', ()=> {
        if (button.classList.contains('wd-comment-submit')) {
            log('ok')
            new CommentApi().add(data)
                .then( (data) => {
                    log(data)
                    // updateCommentBody
                })
        }
    })
}

const commentEdit = () => {
    const wrapper = e('.input-comment-add')
    wrapper.addEventListener('focusin', (event) => {
        let placeholder = e('.placeholder', wrapper)
        if (placeholder !== null) {
            placeholder.remove()
            wrapper.focus()
        }
    })

    wrapper.addEventListener('focusout', (event) => {
        let t = (`
         <span class="placeholder" style="color: #646464"><em>Add Your Comments</em></span>
        `)
        if (wrapper.innerText === '') {
            wrapper.insertAdjacentHTML('beforeend', t)
        }
    })


    const button = e('.wd-comment-btn')
    wrapper.addEventListener('keyup', (event) => {
        let text = wrapper.innerText
        if (text.length > 2 ) {
            button.classList.add('wd-comment-submit')
        } else {
            button.classList.remove('wd-comment-submit')
        }
    })
}

const commentView = () => {
    let hash = location.hash
    if (hash === '#comments') {
        let comment = e('.comment-box')
        setTimeout( () => {
            comment.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }, 100)

    }
}

const commentMain = () => {
    commentView()
    commentEdit()
    commentSubmit()
    let editor = new MediumEditor('.input-comment-add')


}

commentMain()