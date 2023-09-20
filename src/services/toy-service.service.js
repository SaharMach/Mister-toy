
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { func } from 'prop-types'


const STORAGE_KEY = 'toysDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
    getEmptyToy
}

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
const toys = [
    {
    _id: 't102',
    name: 'Buzz',
    price: 99,
    labels: ['Doll', 'Battery Powered'], createdAt: 1631031801011,
    inStock: true,
    },
    {
        _id: 't101',
    name: 'Talking Doll',
    price: 123,
    labels: ['Doll', 'Battery Powered', 'Baby'], 
    createdAt: 1631031801011,
    inStock: true,
    }
    ]

    function query(filterBy = {}) {
        console.log('filterBy: from query', filterBy)
        let toysToShow = utilService.loadFromStorage(STORAGE_KEY)
        if (!toysToShow || !toysToShow.length) utilService.saveToStorage(STORAGE_KEY, toys)
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            toysToShow = toysToShow.filter(toy => regExp.test(toy.name))
        } 
        if (filterBy.inStock) {
            const regExp = new RegExp(filterBy.inStock, 'i')
            toysToShow = toysToShow.filter(toy =>  regExp.test(toy.inStock))
        }
        if (filterBy.labels) {
            const regExp = new RegExp(filterBy.labels, 'i')
            toysToShow = toysToShow.filter(toy => regExp.test(toy.labels))
        }
        if (filterBy.sortBy) {
            toysToShow.sort((a, b) => {
                switch (filterBy.sortBy) {
                    case 'name':
                        return a.name.localeCompare(b.name)
                    case 'price':
                        return a.price - b.price
                    case 'created':
                        return new Date(a.created) - new Date(b.created)
                    default:
                        return 
                }
            })
        }   
        return Promise.resolve({ toysToShow, labels })
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
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    console.log('toy from save:', toy)
    if (toy._id) {
        console.log('toy._id:', toy._id)
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
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
