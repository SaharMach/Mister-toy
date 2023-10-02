import { toyReducer } from "./reducer/toy.reducer.js"
import { userReducer } from "./reducer/user.reducer.js"
import { reviewReducer } from "./reducer/review.reducer.js"
import { combineReducers, compose, legacy_createStore as createStore } from "redux"

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
    // systemModule: systemReducer,
    reviewModule: reviewReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store

// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })

