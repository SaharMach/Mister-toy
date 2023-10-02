import { store } from "../store.js";
import { ADD_REVIEW, REMOVE_REVIEW, SET_REVIEWS } from '../reducer/review.reducer.js'
// import { SET_SCORE, SET_WATCHED_USER } from './user.reducer.js'
import { reviewService } from '../../services/review.service.js'

// Action Creators
export function getActionRemoveReview(reviewId) {
  return { type: REMOVE_REVIEW, reviewId }
}
export function getActionAddReview(review) {
  return { type: ADD_REVIEW, review }
}
export function getActionSetWatchedUser(user) {
  return { type: SET_WATCHED_USER, user }
}

export async function loadReviews(filterBy) {
  console.log('filterBy:', filterBy)
  try {
    const queryObj = {};
    if (filterBy.byToyId) queryObj.byToyId = filterBy.byToyId;
    if (filterBy.byUserId) queryObj.byUserId = filterBy.byUserId;
    const reviews = await reviewService.query(queryObj);
    store.dispatch({ type: SET_REVIEWS, reviews });
  } catch (err) {
    console.log('ReviewActions: err in loadReviews', err)
    throw err
  }
}

export async function getReviews(){
  try{
    const reviews = await reviewService.getAllReviews()

    return reviews
  }
  catch (err) {
    throw err
  }
}


export async function addReview({toyId, txt}) {
  // console.log('review:', review)
  try {
    const addedReview = await reviewService.add({toyId,txt})
    console.log('addedReview:', addedReview)
    store.dispatch(getActionAddReview(addedReview))
  } catch (err) {
    console.log('ReviewActions: err in addReview', err)
    throw err
  }
}

export async function removeReview(reviewId) {
  try {
    await reviewService.remove(reviewId)
    store.dispatch(getActionRemoveReview(reviewId))
  } catch (err) {
    console.log('ReviewActions: err in removeReview', err)
    throw err
  }
}