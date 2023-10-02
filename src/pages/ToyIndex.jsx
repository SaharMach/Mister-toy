import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import {ToyList} from '../cmps/ToyList.jsx'
import { loadToys, removeToy, saveToy } from '../store/action/toy.action.js'
import { ADD_TOY, REMOVE_TOY, SET_FILTER } from '../store/reducer/toy.reducer.js'
import Button from '@mui/material/Button';
import { SOCKET_EVENT_TOY_ADDED, SOCKET_EVENT_TOY_REMOVED, socketService } from '../services/socket.service.js'
import { store } from "../store/store.js";


export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    // const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const labels = useSelector(storeState => storeState.toyModule.labels)
    // const isLoading = useSelector(storeState => storeState.carModule.isLoading)
    useEffect(() => {
        onLoadToys()
        socketService.on(SOCKET_EVENT_TOY_ADDED, toy => {
            store.dispatch({ type:ADD_TOY, toy: toy })
        })

        socketService.on(SOCKET_EVENT_TOY_REMOVED, toyId => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })

        return () => {
            socketService.off(SOCKET_EVENT_TOY_ADDED)
            socketService.off(SOCKET_EVENT_TOY_REMOVED)
        }
    }, [filterBy])

    function onSetFilterBy(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })
    }

    async function onLoadToys(){
        try{
            await loadToys()
        }catch(err){
            showErrorMsg('Cannot load toy')
        }
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            console.log('Cannot remove todo', err)
            showErrorMsg('Cannot remove toy')
        }
    }

    async function onAddToy() {
        const name = prompt('enter toy name')
        const price = +prompt('enter price')
        const newToy = { name ,price }
        try{
            await saveToy(newToy)
            showSuccessMsg('Toy added')

        } catch (err) {
            console.log('Cannot add toy', err)
            showErrorMsg('Cannot add toy')

        }
    }
    
    return (
        <section className='main-area'>
            <section className='main-area-container'>
                <ToyFilter labels={labels} filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                {user && user.isAdmin ? <Button className='profile-btn add-btn' onClick={onAddToy}>Add Toy +</Button>
                : ''}
                <ToyList toys={toys} onRemoveToy={onRemoveToy}  />
            </section>
        </section>
    )
}

