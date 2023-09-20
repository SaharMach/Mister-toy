import { toyReducer } from "./reducer/toy.reducer.js"

import { combineReducers, compose, legacy_createStore as createStore } from "redux"


const rootReducer = combineReducers({
    toyModule: toyReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store

// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })

