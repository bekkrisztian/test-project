import React, { useEffect, useRef } from 'react'
import { useAppSelector } from '../../../../store/store';
import Message from '../Message/Message'
import './MessageBox.scss'

const MessageBox = (props: { chat: any }) => {
    const user = useAppSelector(state => state.auth.user);
    const scrollBottom = useAppSelector(state => state.chat.scrollBottom);
    const senderTyping = useAppSelector<any>(state => state.chat.senderTyping);
    const msgBox: any = useRef();

    const scrollManual = (value: any) => {
        msgBox.current.scrollTop = value
    }

    useEffect(() => {
        setTimeout(() => {
            scrollManual(Math.ceil(msgBox.current.scrollHeight))
        }, 100)
    }, [scrollBottom])

    useEffect(() => {
        if (senderTyping.typing && msgBox.current.scrollTop > msgBox.current.scrollHeight * 0.30) {
            setTimeout(() => {
                scrollManual(msgBox.current.scrollHeight)
            }, 100)
        }
    }, [senderTyping])

    useEffect(() => {
        if (!senderTyping.typing) {
            setTimeout(() => {
                scrollManual(msgBox.current.scrollHeight)
            }, 100)
        }
    }, [scrollBottom])

    return (
        <div id='msg-box' ref={msgBox}>
            {
                props.chat.Messages.map((message: any, index: any) => {
                    return <Message
                        user={user}
                        chat={props.chat}
                        message={message}
                        index={index}
                        key={message.id}
                    />
                })
            }
            {    senderTyping.typing && senderTyping.chatId === props.chat.id
                ? <div className='message mt-5p'>
                    <div className='other-person'>
                        <p className='m-0'>{senderTyping.fromUser.firstName} {senderTyping.fromUser.lastName}...</p>
                    </div>
                </div>
                : null
            }
        </div>
    )
}

export default MessageBox;