import React, { Component } from 'react'
import { Textarea, Button } from 'flowbite-react';
import './TextBar.css'

const TextBar = (props) => {
    let input = React.createRef()

    const sendMessage = () => {
        props.onSend && props.onSend(input.current.value)
        input.current.value = ''
    }
    const sendMessageIfEnter = (e) => {
        if (e.keyCode === 13) {
            sendMessage()
        }
    }

    return (
        <div className='textbar'>
            <Textarea ref={input} onKeyDown={sendMessageIfEnter} />
            <Button onClick={sendMessage} outline>
                Enviar
            </Button>
        </div>
    )
}
export default TextBar