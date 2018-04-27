

const validImg = (input) => {
    log('file', input.files, input.files[0].type)
    let data = input.files[0]
    let type = ['image/png','image/jpeg', 'image/gif' ]
    if (!type.includes(data.type)) {
        AlertNotice.create({
            title: 'invalid type',
            notice: 'only png/jpeg/gif type are allowed'
        })
        input.value = null
        return false
    } else if (data.size > 204800) {
        AlertNotice.create({
            title: 'file too large',
            notice: 'only less than 200k'
        })
        input.value = null
        return false
    }
    return true
}

const uploadImg = () => {
    const avatar = e('.input-avatar')
    avatar.addEventListener('change', () => {
        let formData = new FormData()
        let valid = validImg(avatar)
        formData.append("avatar", avatar.files[0])
        if (valid) {
            new SettingApi().uploadImg(formData)
                .then((res) => {
                    if (res.success) {
                        let img = e('.avatar-preview')
                        img.src = `/user/avatar/${res.data}`
                    } else {
                        AlertNotice.create({
                            title: 'Error',
                            notice: res.message
                        })
                    }
                })
        }
    })
}

const settingMain = () => {
    uploadImg()
}

settingMain()