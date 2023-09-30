import { userService } from "../../services/user.service.js";
import { store } from "../store.js";

import { SET_USER } from '../reducer/user.reducer.js'



export async function login(credentials) {
    try{
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        console.log('user from service:', user)
        return user

    } catch (err) {
        console.log('user actions -> Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try{
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.log('user actions -> Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try{
        const loggedOut = await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
        return loggedOut
    } catch (err) {
        console.error('user actions -> Cannot logout:', err)
        throw err
    }
}

// export function setUserChanges(prefs, fullname, user) {
//     store.dispatch({ type: SET_USER_FULLNAME, fullname })
//     return userService.saveUserPrefs(user._id, prefs, fullname)
//         .catch(err => {
//             console.log('err', err);
//         })
// }

