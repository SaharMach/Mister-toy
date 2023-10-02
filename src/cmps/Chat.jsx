import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service.js'

export function ChatApp({toyId ,toyName, toyImg, onSaveToyMsg, toyMsgs}) {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [topic, setTopic] = useState(toyId)
    const [isTyping, setIsTyping] = useState(false);
    const [typingUser, setTypingUser] = useState('');
    // const [isBotMode, setIsBotMode] = useState(false)

    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    console.log('logged',loggedinUser);
    // const botTimeoutRef = useRef()

    useEffect(() => {
        const user = loggedinUser.fullname
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.on('user-typing', (user) => {
            setIsTyping(true);
            setTypingUser(user);
            setTimeout(() => {
                setIsTyping(false);
                setTypingUser('');
            }, 10000);  
        });
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            // botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        }
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [topic])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    // function sendBotResponse() {
    //     // Handle case: send single bot response (debounce).
    //     botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
    //     botTimeoutRef.current = setTimeout(() => {
    //         setMsgs(prevMsgs => ([...prevMsgs, { from: 'Bot', txt: 'You are amazing!' }]))
    //     }, 1250)
    // }

    function sendMsg(ev) {
        ev.preventDefault()
        onSaveToyMsg(toyId, msg.txt)
        const from = loggedinUser?.fullname || 'Me'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        // if (isBotMode) sendBotResponse()
        // for now - we add the msg ourself
        // addMsg(newMsg)
        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
        socketService.emit('typing', loggedinUser.fullname || 'Me');
    }
    console.log('toymsgs', typingUser);
    console.log('isTyping', isTyping);
    return (
        <section className="chat">
            <div>            
                <label>
                    {/* <input
                        type="radio" name="topic" value={toyId}
                        checked={topic === toyId} onChange={({ target }) => setTopic(target.value)} /> */}
                    <img src={toyImg} alt="" />{toyName}
                    {isTyping && typingUser !== loggedinUser.fullname && <div>{typingUser} is typing...</div>}
                </label>
            </div>

            
            <ul className='clean-list'>
                {toyMsgs ? toyMsgs.map((msg,idx) => (<li key={idx}>{msg.by.fullname} : {msg.txt}</li>)) : ''}
                {msgs.map((msg, idx) => (<li key={idx}>{msg.from = (loggedinUser?.fullname === msg.from) ? 'Me' : msg.from}: {msg.txt}</li>))}
                
            </ul >
            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" />
                <button>Send</button>
            </form>
        </section>
    )
}