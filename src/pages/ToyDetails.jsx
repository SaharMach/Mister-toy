import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy-service.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import ToyMsgs from "../cmps/ToyMsgs.jsx";
import { saveToyMsgs } from '../store/action/toy.action.js'
import Fab from '@mui/material/Fab';
import * as React from 'react';

import AddIcon from '@mui/icons-material/Add';



export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const [txt, setTxt] = useState('')
    const [renderMsgs, setRenderMsgs] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        loadToy();
    }, [toyId, renderMsgs]);

    async function loadToy() {
        try{
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues loading toy details', err);
            showErrorMsg('Cannot load toy');
            navigate('/toy');
        }
    }


    function handleChange({target}) {
        setTxt(target.value)
    }

    async function onSaveToyMsg(ev){
        ev.preventDefault()
        try{
            await saveToyMsgs(toyId, txt)
            showSuccessMsg('Msg has been saved!')
            setRenderMsgs(txt)
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
        <section className="toy-details-chatbox">
        <section className="toy-details-form">
                <form onSubmit={onSaveToyMsg}>
                <label htmlFor="name">
                    <textarea
                    onChange={handleChange}
                    type="text"
                    name="name"
                    id="name"
                    value={txt}
                    placeholder="Add toy msg"
                    />
                    <button>+</button>
                    </label>
                </form>
            </section>
                {toy.msgs ? <ToyMsgs msgs={toy.msgs}/> : 'No msgs for this toy'}
                
        </section>
       
    </section>
    );
}
