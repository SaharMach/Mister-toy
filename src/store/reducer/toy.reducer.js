import { toyService } from "../../services/toy-service.service"

export const SET_FILTER = 'SET_FILTER'
export const SET_TOY = 'SET_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_LABELS = 'SET_LABELS'
// export const CONTACT_UNDO = 'CONTACT_UNDO'
export const SET_TOY_MSG = 'SET_TOY_MSG'

const initialState = {
    toys: [],
    lastToys: [],
    filterBy: toyService.getDefaultFilter(),
    labels: [],
}

export function toyReducer(state = initialState, action) {
    let toys
    let lastToys
    let labels
    switch (action.type) {
        case SET_TOY:
            lastToys = [...action.toys]
            return { ...state, toys: action.toys, lastToys }
        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }
        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            console.log('toys: from REDUCER', toys)
            return { ...state, toys }
        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }
        case REMOVE_TOY:
            lastToys = [...state.toys]
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys, lastToys: lastToys }
        case SET_LABELS:
            return {...state, labels: action.labels}
        // case CONTACT_UNDO:
        //     contacts = [...state.lastContact]
        //     return { ...state, contacts }
        case SET_TOY_MSG: 
            toys = state.toys.map(toy => toy._id === action.toyId ? { ...toy, msgs: action.msg } : toy)
            return { ...state, toys }
        default:
            return state
    }
}


