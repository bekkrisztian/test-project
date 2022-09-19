import React from 'react'
import { useAppSelector } from '../../../../store/store';
import { userStatus } from '../../../../utils/Utils';
import activeDot from '../../../../assets/images/active_dot.png';
import busyDot from '../../../../assets/images/busy_dot.png';
import './Friend.scss'

const Friend = (props: {chat: any, click: any}) => {

    const currentChat = useAppSelector((state: any) => state.chat.currentChat);

    const isChatOpened = () => {
        return currentChat.id === props.chat.id ? 'opened' : ''
    }

    const lastMessage = () => {
        if (props.chat.Messages.length === 0) return ''

        const message = props.chat.Messages[props.chat.Messages.length - 1];
        
        return message.type === 'image' ? 'image uploaded' : message.message
    }

    const convertToDate = () => {
        if (props.chat.Messages.length === 0) return ''
        const message = props.chat.Messages[props.chat.Messages.length - 1];
        const date = new Date(message.updatedAt);
        if (isNaN(date.getDay())) return "";
        return `${date.getDay()}.${date.getDate()}.${date.getFullYear()}`;
    }

    return (
        <div onClick={props.click} className={`friend-list ${isChatOpened()}`}>
            <div>
                <img width='40' height='40' src={props.chat.Users[0].avatar} alt='User avatar' />
                <img id="status-img" src={userStatus(props.chat.Users[0]) == "online" ? activeDot : busyDot} className={`online-status ${userStatus(props.chat.Users[0])}`}></img>
                <div className='friend-info'>
                    <h4 className='m-0'>{props.chat.Users[0].firstName} {props.chat.Users[0].lastName}</h4>
                    <h5 className='m-0'>{lastMessage()}</h5>
                </div>
                <h5 className='m-0'>{convertToDate()}</h5>
            </div>
        </div>
    )
}

export default Friend