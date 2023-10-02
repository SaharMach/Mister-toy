import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy-service.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import ToyMsgs from "../cmps/ToyMsgs.jsx";
import { saveToyMsgs } from '../store/action/toy.action.js'
import Fab from '@mui/material/Fab';
import * as React from 'react';
import { Reviews } from "../cmps/Reviews.jsx";
import AddIcon from '@mui/icons-material/Add';
import {  addReview } from '../store/action/review.action.js'
import { ChatApp } from "../cmps/Chat.jsx";
import { Chat } from "@mui/icons-material";



export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const [txt, setTxt] = useState('')
    const [renderMsgs, setRenderMsgs] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        loadToy();
    }, [toyId, renderMsgs])

    async function loadToy() {
        try{
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues loading toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }


    function handleChange({target}) {
        setTxt(target.value)
    }

    async function onSaveToyMsg(toyId,text){
        try{
            await saveToyMsgs(toyId, text)
            showSuccessMsg('Msg has been saved!')
            // setRenderMsgs(txt)
        } catch (err) {
            throw err
        }
    }

    async function onSaveToyReview(ev){
        ev.preventDefault()
        console.log(txt);
        try{
            await addReview({toyId,txt})
            showSuccessMsg('Review has been saved!')
            // setRenderMsgs(txt)
        } catch (err) {
            throw err
        }
    }

    if (!toy) return <div>Loading...</div>;
    console.log('toy msgs from details', toy.msgs);
    return (
        <section className="toy-details-container">


        <section className="toy-details">
            <img src={toy.img} alt="" />
            <h1>{toy.name}</h1>
            <h5>Price: ${toy.price.toLocaleString()}</h5>
            <p>Labels: {toy.labels.join(', ')}</p>
            <p>Available in stock: {toy.inStock ? "Yes" : "No"}</p>
            <p>Created At: {new Date(toy.createdAt).toLocaleDateString()}</p>
            <p className="toy-details-description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!
            </p>
            <Link to="/toy" className="toy-details-back-link">Back to Toy List</Link>
           
           
        </section>

        <section className="toy-details-msgs-reviews">
        <ChatApp onSaveToyMsg={onSaveToyMsg} toyId={toy._id} toyMsgs={toy.msgs} toyName={toy.name} toyImg={toy.img}/>
        {/* <section className="toy-details-chatbox"> */}
            {/* <section className="toy-details-form">
                <form onSubmit={onSaveToyMsg}>
                <label htmlFor="name">
                    <textarea
                    onChange={handleChange}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Add toy msg"
                    />
                    <button>+</button>
                    </label>
                </form>
            </section> */}
                {/* {toy.msgs ? <ToyMsgs msgs={toy.msgs}/> : 'No msgs for this toy'} */}
                
         {/* </section> */}
            <section className="toy-details-reviews">
                <section className="toy-details-form">
                    <form onSubmit={onSaveToyReview}>
                                <label htmlFor="name">
                                    <textarea
                                    onChange={handleChange}
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Add toy review"
                                    />
                                    <button>+</button>
                                    </label>
                                </form>
                    <Reviews toyId={toy._id}/>
                </section>
            </section>
            
       </section>
    </section>
    );
}
