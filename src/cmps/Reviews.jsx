import {  loadReviews } from '../store/action/review.action.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export function Reviews({toyId, userId}) {
    const reviews = useSelector(storeState => storeState.reviewModule.reviews);

    useEffect(() => {
        onLoadReviews()
    }, []);

    async function onLoadReviews() {
        try {
            await loadReviews({byToyId: toyId, byUserId: userId})
        } catch (err) {
            showErrorMsg('Cannot load reviews')
        }
    }
    console.log('reviews from rev cmps', reviews);
    return (
        <div className="reviews-container">
            <h2>Reviews</h2>
            {reviews && reviews.map(review => (
                <div key={review._id} className="review-card">
                    <div className="review-user">
                        <span>{review.user && review.user.fullname} says:</span>
                    </div>
                    <div className="review-content">
                        <q>{review.txt}</q>
                    </div>
                   
                </div>
            ))}
        </div>
    )
}
