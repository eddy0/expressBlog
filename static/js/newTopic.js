
const formatContent = (content) => {
    content = content.split('<div>').join('<br>')
    content = content.split('</div>').join('<br>')
    return content
}

const validContent = (str) => {
    let len = str.length
    if (len < 4){
        return false
    }

    let trim = ''
    for (let i = 0; i < len; i++ ) {
        let s = str[i]
        if (s !== ' '){
            trim += s
        }
    }
    if (trim.length < 4){
        return false
    }

    return str
}

const topicTile = () => {
    const box = e('.title-content')
    let title = box.value
    title = validContent(title)
    return title
}

const topicTag = () => {
    const items = es('.selected')
    if (items.length < 1 ){
        return false
    } else {
        let tags = []
        for (let i = 0; i < items.length; i++ ) {
            let tag = items[i].innerText
            tags.push(tag)
        }
        return tags
    }
}

const topicContent = () => {
    const box = e('.text-container')
    let content = box.innerHTML
    content = formatContent(content)
    content = validContent(content)
    return content
}

const NewTopicSubmit = () => {
    let title = topicTile()
    let tag = topicTag()
    let content =  topicContent()
    let valid = title && tag && content
    if (valid){
        return {title, tag, content}
    }
}

const selectCheck = () => {
    let items = es('.tag-item')
    for (let i = 0; i < items.length; i++ ) {
        let item = items[i]
        if (item.classList.contains('selected')) {
           return false
        }
    }
    return true
}

const bindTagEvent = () => {
    const list = e('.tag-list')
    list.addEventListener('click', (event) => {
        let self = event.target
        if (self.classList.contains('tag-item')) {
            self.classList.toggle('selected')
        }
        let selected = selectCheck()
        let hint = e('.tag-hint')
        if (selected) {
            hint.style.opacity = 1
        } else {
            hint.style.opacity = 0
        }


    })
    bindAll('tag-item', 'click', (event) => {
    })
}

const actionsSubmit = (element, data) => {
    let cls = element.classList
    if (cls.contains('wd-topic-submit')){
        data.uid = 1
        let api = new TopicApi()
        api.add(data).then( (r) => {
            if (r.success === true) {
                log('success')
                new AlertNotice({
                    title:'success',
                    notice: 'add successfully'
                }).on( () => {
                    window.location.href='http://localhost:7000/'
                })
            }
        })
    }
}

const newTopicEvent = () => {
    bindTagEvent()
    // get the title
    bindAll('wd-topic-btn', 'click', (event) => {
        let self = event.target
        let content = NewTopicSubmit()
        log(content)
        if (content !== undefined){
            actionsSubmit(self, content)
        } else{
            new AlertNotice({
                title: 'Incomplete',
                notice: 'Title length must be greater then 4;<br>Must select a tag'
            })
        }
    })
}

const __TopicMain = () => {
    newTopicEvent()
    let editor = new MediumEditor('.text-container')

}


document.addEventListener("DOMContentLoaded", function(event) {
    __TopicMain()

})
