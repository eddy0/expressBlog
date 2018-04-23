class User extends Model{
    constructor(form={}){
        super(form)
        this.username = form.username || ''
        this.password = this.saltedPassword(form) || ''
        this.note = form.note || 'nothing is noting'
        this.avatar = form.avatar || 'default.img'
        this.role = 2
    }

}