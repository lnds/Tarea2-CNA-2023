// src/MessageWindow.jsx

import React, { useEffect } from 'react'
import './MessageWindow.css'
import { Timeline } from 'flowbite-react';

const Message = ({ text, username, self }) => (
    <Timeline.Item>
        <Timeline.Point />
        <Timeline.Content></Timeline.Content>
        <Timeline.Title>{username}</Timeline.Title>
        <Timeline.Body>{text}</Timeline.Body>
    </Timeline.Item>
)

const MessageWindow = ({ messages = [], username }) => {
    let messageWindow = React.createRef()

    useEffect(() => {
        // const messageWindow = messageWindow.current
        // messageWindow.scrollTop = messageWindow.scrollHeight - messageWindow.clientHeight
    })
    return (
        <Timeline>
            {messages.map((msg, i) => {
                return <Message key={i} text={msg.text} username={msg.username} self={username === msg.username} />
            })}
        </Timeline>
    )
}

export default MessageWindow
