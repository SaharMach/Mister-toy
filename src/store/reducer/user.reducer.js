import { userService } from "../../services/user.service.js";

export const SET_USER = 'SET_USER'
export const SET_USER_FULLNAME = 'SET_USER_FULLNAME'

const initialState = {
    loggedinUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action = {}) {
    let user
    switch (action.type) {
        case SET_USER:
            return { ...state, loggedinUser: action.user }
        // case SET_USER_BALANCE:
        //     user = { ...state.loggedinUser, balance: action.balance }
        //     return { ...state, loggedinUser: user }
        case SET_USER_FULLNAME:
            user = { ...state.loggedinUser, fullname: action.fullname }
            return { ...state, loggedinUser: user }
        // case ADD_ACTIVITY:
        //     return { ...state, activities: action.activity }
        default:
            return state
    }
}