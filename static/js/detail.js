

const generalCommentTemplate = (data) => {
    let t = `
       <div class="comment-item">
                <div class="comment-feed">
                        <span class="comment-author">
                            <a href="/user/${data.user._id}" class="comment-author-self">
                            ${data.user.nickname}
                            </a>
                        </span>

                    <span class="comment-date">
                           ${ data.createdTime}
                        </span>

                </div>


                <div class="comment-content">
                    ${data.content}
                </div>

                <div class="comments-action">

                </div>

            </div>
    `
    return t
}

const updateCommentBody = (data) => {
    let box = e('.comment-list')
    let t
    if (data.isAuthor) {

    } else {
        t = generalCommentTemplate(data)
    }
    box.insertAdjacentHTML('afterbegin', t)

}

const topicCommentData = () => {
    const wrapper = e('.input-comment-add')
    let content = wrapper.innerHTML
    return {content}
}

const commentSubmit = () => {
    const button = e('.wd-comment-btn')
    button.addEventListener('click', ()=> {
        if (button.classList.contains('wd-comment-submit')) {
            let data = topicCommentData()
            log(data)
            new CommentApi().add(data)
                .then( (data) => {
                    if (data.success) {
                        updateCommentBody(data.data)
                    }
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