import React, { useEffect } from 'react';
import { useAppSelector } from '../../store/store';
import Navbar from './components/Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { fetchChats } from '../../store/chatSlice';
import FriendList from './components/FriendList/FriendList';
import useSocket from './hooks/socketConnection';
import Messenger from './components/Messenger/Messenger';
import Profile from './components/Profile/Profile';


import './Chat.scss';
import logo from '../../assets/images/Logo.png'

const Chat: React.FC = () => {

    const dispatch = useDispatch();
    const user = useAppSelector((state: any) => state.auth.user);
    
    useSocket(user, dispatch);

    const fetchChatMessages = async () => {
        await dispatch<any>(fetchChats());
    }

    useEffect(() => {
        fetchChatMessages();
    }, [dispatch]);

    return (
        <div id="chat-container">
            <Navbar />
            <div id="chat-wrap">
                <div id="left-column">
                    <div id="hidden-area">
                        <div id="logo">
                            <img src={logo} alt="logo" />
                        </div>
                        <hr />
                        <Profile />
                    </div>
                    <FriendList />
                </div>
                <Messenger />
            </div>
        </div>
    );
}

export default Chat;