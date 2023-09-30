
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
// import { func } from 'prop-types'
import { httpService } from './http.service.js'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
    getLabels,
    saveToyMsg
    // getEmptyToy
}

function getLabels(){
    return labels
}

async function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}
    

function getDefaultFilter() {
    return {
        txt: '',       
        inStock: null,   
        labels: [],       
        sortBy: ''        
    };
}

async function saveToyMsg(toyId, txt){
    console.log('txt:', txt)
    const savedMsg = await httpService.post(BASE_URL + toyId + '/msg', {txt})
    return savedMsg
}

async function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

async function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

async function save(toy) {
    console.log('toy from save:', toy)
    var savedToy
    if (toy._id) {
        console.log('toy._id:', toy._id)
        savedToy = await httpService.put(BASE_URL, toy)
    } else {
        savedToy = await httpService.post(BASE_URL, toy)
    }
    return savedToy
}
