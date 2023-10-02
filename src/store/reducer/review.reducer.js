export const SET_REVIEWS = 'SET_REVIEWS'
export const ADD_REVIEW = 'ADD_REVIEW'
export const REMOVE_REVIEW = 'REMOVE_REVIEW'
export const UPDATE_REVIEW = 'UPDATE_REVIEW'
export const SET_REVIEW_FILTER = 'SET_REVIEW_FILTER'

const initialState = {
  reviews: [],
  filterBy: {byUserId:'', byToyId:''},

}

export function reviewReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_REVIEWS:
      return { ...state, reviews: action.reviews }
    case SET_REVIEW_FILTER:
        return { ...state, filterBy: action.filterBy }
    case ADD_REVIEW:
      return { ...state, reviews: [...state.reviews, action.review] }
    case REMOVE_REVIEW:
      return { ...state, reviews: state.reviews.filter(review => review._id !== action.reviewId) }
    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map(review =>
          review._id === action.review._id ? action.review : review
        )}
    default:
      return state
  }
}
