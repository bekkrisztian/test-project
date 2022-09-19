import React from 'react'
import './Message.scss'

const Message = (props: { user: any, chat: any, index: any, message: any }) => {

    const determineMargin = () => {

        if (props.index + 1 === props.chat.Messages.length) return;

        return props.message.fromUserId === props.chat.Messages[props.index + 1].fromUserId ? 'mb-5' : 'mb-10';
    }

    return (
        <div className={`message ${determineMargin()} ${props.message.fromUserId === props.user.id ? 'creator' : ''}`}>
            <div className={props.message.fromUserId === props.user.id ? 'owner' : 'other-person'}>
                {
                    props.message.fromUserId !== props.user.id
                        ? <h6 className='m-0'>{props.message.User.firstName} {props.message.User.lastName}</h6>
                        : null
                }                {
                    props.message.type === 'text'
                        ? <p className='m-0'>{props.message.message}</p>
                        : <img src={props.message.message} alt='User upload' />
                }
            </div>
        </div>
    )
}

export default Message;