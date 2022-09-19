import { useEffect } from "react";
import socketIoClient from "socket.io-client";
import { createChat, fetchChats, onlineFriends, receivedMessage, senderTyping } from "../../../store/chatSlice";

const useSocket = (user: any, dispatch: any) => {
    
    if (localStorage.getItem("user")) {
        useEffect(() => {
            dispatch(fetchChats()).then((res: any) => {
                const socket = (socketIoClient as any).connect("http://localhost:8080");

                if (!localStorage.getItem("user")) {
                    socket.emit("disconnect");
                }
        
                socket.emit("join", user);
    
                socket.on('typing', (sender: any) => {
                    dispatch(senderTyping(sender));
                })
    
                socket.on("typing", (user: any) => {
                    console.log("Event", user);
                })
                socket.on('friends', (friends: any) => {
                    console.log("Friends", friends);
                    dispatch(onlineFriends(friends));
                })
        
                socket.on('online', (user: any) => {
                    // dispatch(onlineFriend(user))
                    console.log("Online", user);
                })
        
                socket.on('offline', (user: any) => {
                    // dispatch(offlineFriend(user))
                    console.log("Offline", user);
                })
        
                socket.on('received', (message: any) => {
                    dispatch(receivedMessage({message, ...user.id}));
                });

                socket.on('new-chat', (chat: any) => {
                    dispatch(createChat(chat))
                })
            }).catch((error: any) => {
                console.log("Socket error", error);
            });
        }, [dispatch]);
    }
}

export default useSocket;