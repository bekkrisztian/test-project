import React, { Fragment, useState } from 'react'
import { userStatus } from '../../../../utils/Utils'

import './ChatHeader.scss'

const ChatHeader = (props: { chat: any }) => {

    const [showChatOptions, setShowChatOptions] = useState(false);

    const leaveChat = () => {
        // TODO
    }

    const deleteChat = () => {
        // TODO
    }

    return (
        <Fragment>
            <div id='chatter'>
                {
                    props.chat.Users.map((user: any) => {
                        return <div className='chatter-info' key={user.id}>
                            <h3>{user.firstName} {user.lastName}</h3>
                            <div className='chatter-status'>
                                <span className={`online-status ${userStatus(user)}`}></span>
                            </div>
                        </div>
                    })
                }
                <div onClick={() => setShowChatOptions(!showChatOptions)} className='dots'>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </div>
            </div>
            {
                showChatOptions
                    ? <div id='settings'>
                        <div>
                            <p>Add user to chat</p>
                        </div>

                        {
                            props.chat.type === 'group'
                                ? <div onClick={() => leaveChat()}>
                                    <p>Leave chat</p>
                                </div>
                                : null
                        }

                        {
                            props.chat.type === 'dual' ?
                                <div onClick={() => deleteChat()}>
                                    <p>Delete chat</p>
                                </div>
                                : null
                        }
                    </div>
                    : null
            }
        </Fragment>
    )
}

export default ChatHeader