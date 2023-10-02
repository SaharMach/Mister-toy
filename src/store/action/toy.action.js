
import { toyService } from '../../services/toy-service.service.js'
import { store } from "../store.js";

import { SET_TOY, REMOVE_TOY,ADD_TOY,UPDATE_TOY,SET_LABELS,SET_TOY_MSG } from '../reducer/toy.reducer.js'

export async function loadToys() {
    const { filterBy } = store.getState().toyModule
    try{
        const toys = await toyService.query(filterBy)
        console.log('toys: from load', toys)
        const labels = toyService.getLabels()
        store.dispatch({ type: SET_TOY, toys })
        store.dispatch({ type: SET_LABELS, labels})
    } catch (err){
            showErrorMsg('Cannot load toys')    
            throw err
    }     
}

export async function removeToy(toyId) {
    try{
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })

    } catch (err) {
        console.log('toy action -> Cannot remove toy', err)
        throw err
    }
}

export async function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    try {
        const toyToSave = await toyService.save(toy)
        console.log('toyToSave:', toyToSave)
        store.dispatch({ type, toy: toyToSave })
        return toyToSave
    } catch (err) {
        console.log('toy action -> Cannot save toy', err)
        throw err
    }
   
}

export async function saveToyMsgs(toyId, txt){
    try{
        const msg = await toyService.saveToyMsg(toyId,txt)
        console.log('msg: from action!', msg)
        store.dispatch({type: SET_TOY_MSG, toyId, msg })
    } catch (err) {
        console.log('toy action -> Cannot save toy msg', err)
        throw err
    }
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

