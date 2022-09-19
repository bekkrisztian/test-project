import React from 'react'
import { useAppSelector } from '../../../../store/store'
import ChatHeader from '../ChatHeader/ChatHeader'
import MessageBox from '../MessageBox/MessageBox'
import MessageInput from '../MessageInput/MessageInput'
import './Messenger.scss'

const Messenger: React.FC = () => {

    const chat = useAppSelector((state: any) => state.chat.currentChat);

    const activeChat = () => {
        return Object.keys(chat).length > 0;
    }

    return (
        <div id='messenger' className='shadow-light'>
            {
                activeChat()
                    ? <div id='messenger-wrap'>
                        <ChatHeader chat={chat} />
                        <hr />
                        <MessageBox chat={chat} />
                        <MessageInput chat={chat} />
                    </div>
                    : <p>No active chat</p>
            }
        </div>
    )
}

export default Messenger