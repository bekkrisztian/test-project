import React, { Fragment, useState } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from '../../../../store/store';
import Friend from "../Friend/Friend"
import { setCurrentChat } from "../../../../store/chatSlice"

import "./FriendList.scss"
import addBtn from '../../../../assets/images/button_add.png';
import Modal from "../../../Modal/Modal";
import { ChatService } from "../../../../services/communicationService";
import { socket } from "../../hooks/socketService";

const FriendList: React.FC = () => {

    const dispatch = useDispatch();
    const chats = useAppSelector((state: any) => state.chat.chats);

    const [showFriendsModal, setShowFriendsModal] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const openChat = (chat: any) => {
        dispatch(setCurrentChat(chat))
    }

    const searchFriends = (e: any) => {
        ChatService.searchUsers(e.target.value)
            .then(res => setSuggestions(res))
    }

    const addNewFriend = (id: any) => {
        ChatService.createChat(id)
            .then(chats => {
                socket.emit("add-friend", chats)
                setShowFriendsModal(false)
            }).catch(err => console.log(err))
    }

    return (
        <div id="friends" className="shadow-light">
            <div id="title">
                <h5 className="m-0">Active Chats</h5>
                <button onClick={() => setShowFriendsModal(true)}><img src={addBtn} alt="addBtn"></img></button>
            </div>

            <div id="friends-box">
                {
                    chats.length > 0
                        ? chats.map((chat: any) => {
                            return <Friend click={() => openChat(chat)} chat={chat} key={chat.id} />
                        })
                        : <p id="no-chat">No friends added</p>
                }
            </div>
            {
                showFriendsModal &&
                <Modal click={() => setShowFriendsModal(false)}>
                    <Fragment key="header">
                        <h3 className="m-0">Create new chat</h3>
                    </Fragment>

                    <Fragment key="body">
                        <p>Find friends by typing their name bellow</p>
                        <input
                            onInput={e => searchFriends(e)}
                            type="text"
                            placeholder="Search..."
                        />
                        <div id="suggestions">
                            {
                                suggestions.map((user: any) => {
                                    return <div key={user.id} className="suggestion">
                                        <p className="m-0">{user.firstName} {user.lastName}</p>
                                        <button onClick={() => addNewFriend(user.id)}>ADD</button>
                                    </div>
                                })
                            }
                        </div>
                    </Fragment>
                </Modal>
            }
        </div>
    )
}

export default FriendList