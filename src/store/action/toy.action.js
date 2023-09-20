
import { toyService } from '../../services/toy-service.service.js'
import { store } from "../store.js";

import { SET_TOY, REMOVE_TOY,ADD_TOY,UPDATE_TOY,SET_LABELS } from '../reducer/toy.reducer.js'

export function loadToys() {
    const { filterBy } = store.getState().toyModule
    console.log('filterBy:', filterBy)
    return toyService.query(filterBy)
        .then(toys => {
            console.log('contacts:', toys)
            store.dispatch({ type: SET_TOY, toys: toys.toysToShow })
            store.dispatch({ type: SET_LABELS, labels: toys.labels})
        })
        .catch(err => {
            console.log('car action -> Cannot load todos', err)
            throw err
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            store.dispatch({ type: TOY_UNDO })
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    console.log('toyToSave:', toy)
    return toyService.save(toy)
        .then(toyToSave => {
            console.log('savedContact: from action', toyToSave)   
            store.dispatch({ type, toy: toyToSave })
            return toyToSave
        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}

// export function toggleTodo(todoId, user) {
//     console.log('todoId', todoId)
//     return addContactService.getById(todoId)
//         .then(todo => {
//             const todoToSave = { ...todo, isDone: !todo.isDone }
//             return addContactService.save(todoToSave)
//                 .then((saveTodo) => {
//                     store.dispatch({ type: UPDATE_TODO, todo: saveTodo })
//                 })
//         })
//         .catch(err => {
//             console.log('Cannot toggle todo', err)
//         })
// }

