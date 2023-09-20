
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
// import { func } from 'prop-types'
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
    getEmptyToy
}

    function query(filterBy = {}) {
        console.log('filterBy: from query', filterBy)
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


function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)}

function save(toy) {
    console.log('toy from save:', toy)
    if (toy._id) {
        console.log('toy._id:', toy._id)
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getEmptyToy(name, price ) {
    let label = utilService.getRandomIntInclusive(0, labels.length)
    return {
        name,
        price,
        labels: labels[label],
        inStock: true,
        createdAt: Date.now()
    }
}
