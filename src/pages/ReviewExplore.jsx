import { Reviews } from "../cmps/Reviews"

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getReviews } from "../store/action/review.action"

export function ReviewExplore(){
    const [reviews, setAllReviews] = useState('')
    useEffect(() => {
        loadReviews()
    }, []);



    async function loadReviews() {
        try{
            const allReviews = await getReviews()
            setAllReviews(allReviews)
        }catch(err){
            throw err
        }
    }
    return (
        <div className="review-explore-container">

        
        <div className="reviews-container">
            <h2>Reviews explore</h2>
            {reviews && reviews.map(review => (
                <div key={review._id} className="review-card">
                    <img src={`https://robohash.org/${review.user.fullname}`} alt="" />
                    <div className="review-user">
                        <span>{review.user && review.user.fullname} says:</span>
                    </div>
                    <div className="review-content">
                        <q>{review.txt}</q>
                    </div>
                    <div className="review-toy-info">
                        <span>About the toy "{review.toy.name}" priced at ${review.toy.price}</span>
                    </div>
                </div>
            ))}
        </div>
        </div>
    )
}



