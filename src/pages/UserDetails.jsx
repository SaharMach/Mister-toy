
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect,useState } from 'react'
import { Reviews } from '../cmps/Reviews.jsx'

// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { toyService } from '../services/toy-service.service.js'
import { saveToy } from '../store/action/toy.action.js'




export function UserDetails(){
    //   const user = useSelector(storeState => storeState.loggedinUser)
      const { userId } = useParams()
      console.log('user from details', userId);
    return (
        <div className='user-details-page'>
            
            <Reviews  userId={userId}/>
        </div>
    )
}