import ajax from './ajax'
import jsonp from 'jsonp'

export const reqLogin = (username,password) => ajax('/login', { username, password }, 'POST')

export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')
