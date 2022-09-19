import React, { useState, useRef, useEffect, useContext } from 'react';
import { useAppSelector } from '../../../../store/store';
import Picker from 'emoji-picker-react';
import './MessageInput.scss';
import smile from '../../../../assets/images/smile.png';
import imgIcon from '../../../../assets/images/img-icon.png';
import sendBtn from '../../../../assets/images/send_button.png';
import { SocketContext } from '../../hooks/socketService';
import { ChatService } from '../../../../services/communicationService';

const MessageInput = (props: { chat: any }) => {

    const user = useAppSelector(state => state.auth.user);
    const socket = useContext(SocketContext);

    const fileUpload = useRef<any>();
    const msgInput = useRef<any>();

    const [message, setMessage] = useState('');
    const [image, setImage] = useState<any>('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleMessage = (e: any) => {
        const value = e.target.value
        setMessage(value)

        const receiver = {
            chatId: props.chat.id,
            fromUser: user,
            toUserId: props.chat.Users.map((user: any) => user.id)
        }

        if (value.length === 1) {
            (receiver as any).typing = true;
            (socket as any).emit('typing', receiver);
        }

        if (value.length === 0) {
            (receiver as any).typing = false;
            (socket as any).emit('typing', receiver);
        }
    }

    const handleKeyDown = (e: any, imageUpload: any) => {
        if (e.key === 'Enter') sendMessage(imageUpload)
    }

    const sendMessage = (imageUpload?: any) => {

        if (message.length < 1 && !imageUpload) return

        const msg = {
            type: imageUpload ? 'image' : 'text',
            fromUser: user,
            toUserId: props.chat.Users.map((user: any) => user.id),
            chatId: props.chat.id,
            message: imageUpload ? imageUpload : message
        }

        setMessage('');
        setImage('');
        setShowEmojiPicker(false);

        (socket as any).emit('message', msg);
    }

    const handleImageUpload = () => {
        const formData = new FormData()
        formData.append('id', props.chat.id)
        formData.append('image', image)

        ChatService.uploadImage(formData)
            .then(image => {
                sendMessage(image)
            })
            .catch(err => console.log(err))
    }

    const onEmojiClick = (event: any, emojiObject: any) => {
        setShowEmojiPicker(emojiObject);
    };

    return (
        <div id='input-container'>
            <div id='image-upload-container'>
                <div id='image-upload'>
                    {
                        image.name ?
                            <div id='image-details'>
                                <p className='m-0'>{image.name}</p>
                                <span onClick={handleImageUpload}>Upload</span>
                                <span onClick={() => setImage('')}>Remove</span>
                            </div>
                            : null
                    }
                    <img src={imgIcon} alt="imgIcon" onClick={() => fileUpload.current.click()}/>
                </div>
            </div>
            <div id='message-input'>
                <input
                    ref={msgInput}
                    value={message}
                    type='text'
                    placeholder='Message...'
                    onChange={e => handleMessage(e)}
                    onKeyDown={e => handleKeyDown(e, false)}
                />
                <img id="emoji-btn" onClick={() => setShowEmojiPicker(!showEmojiPicker)} src={smile} alt="" />
                <img id="send-btn" onClick={() => sendMessage()} src={sendBtn} alt="" />

            </div>

            <input id='chat-image' ref={fileUpload} type='file' onChange={(e: any) => setImage(e.target.files[0])} />

            {
                showEmojiPicker
                    ?
                    <Picker onEmojiClick={onEmojiClick} pickerStyle={{width: '100%'}} />
                    : null
            }

        </div>
    )
}

export default MessageInput;