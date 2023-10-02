import { httpService } from './http.service.js'
// import { storageService } from './async-storage.service'
import { userService } from './user.service'


export const reviewService = {
  add,
  query,
  remove,
  getAllReviews
}

function query(filterBy) {
  console.log('filterBy:', filterBy)
  var queryStr
  if(filterBy.byToyId) {
    queryStr = `?byToyId=${filterBy.byToyId}` 
  }
  if(filterBy.byUserId){
    queryStr =`?byUserId=${filterBy.byUserId}`
  }
  return httpService.get(`review${queryStr}`)
  // queryStr = (filterBy.byToyId) ? `?byToyId=${filterBy.byToyId}`  : ''
  // queryStr = (filterBy.byUserId) ? `?byUserId=${filterBy.byUserId}` : '' 
  // queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return storageService.query('review')
}

async function getAllReviews(){
  return httpService.get('review')
}

async function remove(reviewId) {
  await httpService.delete(`review/${reviewId}`)
  // await storageService.remove('review', reviewId)
}

async function add({toyId, txt}) {
  console.log('txt: from review service', txt, toyId)
  const addedReview = await httpService.post(`review`, {toyId, txt})
  console.log('addedReview:', addedReview)
  
  // const aboutUser = await userService.getById(aboutUserId)

  // const reviewToAdd = {
  //   txt,
  //   byUser: userService.getLoggedinUser(),
  //   aboutUser: {
  //     _id: aboutUser._id,
  //     fullname: aboutUser.fullname,
  //     imgUrl: aboutUser.imgUrl
  //   }
  // }

  // reviewToAdd.byUser.score += 10
  // await userService.update(reviewToAdd.byUser)
  // const addedReview = await storageService.post('review', reviewToAdd)
  return addedReview
}