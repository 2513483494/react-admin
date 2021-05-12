import store from 'store'

const USER_KEY = 'User_key'

export default {
    saveUser(user) {
        store.set(USER_KEY, user)
    },
    getUser() {
        return store.get(USER_KEY) || {}
    },
    delUser() {
        store.remove(USER_KEY)
    }
}