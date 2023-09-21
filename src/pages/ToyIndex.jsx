import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import {ToyList} from '../cmps/ToyList.jsx'
import { loadToys, removeToy, saveToy } from '../store/action/toy.action.js'
import { SET_FILTER } from '../store/reducer/toy.reducer.js'
import { toyService } from '../services/toy-service.service.js'

export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    // const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const labels = useSelector(storeState => storeState.toyModule.labels)
    // const isLoading = useSelector(storeState => storeState.carModule.isLoading)
    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])

    function onSetFilterBy(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove todo', err)
                showErrorMsg('Cannot remove todo')
            })
    }

    function onAddToy() {
        const name = prompt('enter toy name')
        const price = +prompt('enter price')
        const toyToSave = toyService.getEmptyToy()
        const newToy = { ...toyToSave, name ,price }
        saveToy(newToy)
            .then(savedToy => {
                showSuccessMsg('Toy added')
            })
            .catch(err => {
                console.log('Cannot add todo', err)
            })
    }
    
    return (
        <section className='main-area-container'>
            <section className='main-container'>
                <ToyFilter labels={labels} filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                {!toys && <button className='profile-btn add-btn' onClick={onAddToy}>Add Toy +</button>}
                <ToyList toys={toys} onRemoveToy={onRemoveToy}  />
            </section>
        </section>
    )
}

