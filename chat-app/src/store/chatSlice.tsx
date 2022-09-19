import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatService } from '../services/communicationService';

interface ChatState {
   chats: Array<[]>;
   currentChat: object;
   newMessage: object;
   scrollBottom: number;
   senderTyping: object;
}

const initialState: ChatState = {
    chats: [],
    currentChat: {},
    newMessage: { chatId: null, seen: null },
    scrollBottom: 0,
    senderTyping: { typing: false }
}

export const fetchChats = createAsyncThunk("fetchChates", async () => {
    const response = await ChatService.fetchChats();
    if (response) {
        response.data.forEach((chat: any) => {
            chat.Users.map((user: any) => {
                user.status = "offline";
            });
            chat.Messages.reverse();
        })
        return response.data;
    }
    return response;
});

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setCurrentChat: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                currentChat: action.payload,
                scrollBottom: state.scrollBottom + 1,
                newMessage: {chatId: null, seen: null}
            }
        },
        onlineFriends: (state, action: PayloadAction<any>) => {
            const chatsCopy = state.chats.map((chat: any) => {
                return {
                    ...chat,
                    Users: chat.Users.map((user: any) => {
                        if (action.payload.includes(user.id)) {
                            return {
                                ...user,
                                status: 'online'
                            }
                        }
                        return user;
                    })
                }
            });
            return {
                ...state,
                chats: chatsCopy
            }
        },
        // friendOnline: (state, action: PayloadAction<any>) => {

        // },
        // friendOffline: (state, action: PayloadAction<any>) => {

        // },
        receivedMessage: (state, action: PayloadAction<{message: any, userId: any}>) => {
            const { userId, message } = action.payload;
            let currentChatCopy: any = { ...state.currentChat }
            let newMessage = { ...state.newMessage }
            let scrollBottom = state.scrollBottom

            const chatsCopy = state.chats.map((chat: any) => {
                if (message.chatId === chat.id) {
                    
                    if (message.User.id === userId) {
                        scrollBottom++
                    } else {
                        newMessage = {
                            chatId: chat.id,
                            seen: false
                        }
                    }
                    
                    if (message.chatId === currentChatCopy.id) {
                        currentChatCopy = {
                            ...currentChatCopy,
                            Messages: [...currentChatCopy.Messages, ...[message]]
                        }
                    }
                    return {
                        ...chat,
                        Messages: [...chat.Messages, ...[message]]
                    }
                }

                return chat;
            })

            if (scrollBottom === state.scrollBottom) {
                return {
                    ...state,
                    chats: chatsCopy,
                    currentChat: currentChatCopy,
                    newMessage,
                    senderTyping: { typing: false }
                }
            }

            console.log("currentChatCopy", currentChatCopy);
            

            return {
                ...state,
                chats: chatsCopy,
                currentChat: currentChatCopy,
                newMessage,
                scrollBottom,
                senderTyping: { typing: false }
            }
        },
        senderTyping: (state, action: PayloadAction<any>) => {
            if (action.payload) {
                return {
                    ...state,
                    senderTyping: action.payload,
                    scrollBottom: state.scrollBottom + 1
                }
            } else {
                return {
                    ...state,
                    senderTyping: action.payload,
                }
            }
        },
        createChat: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                chats: [...state.chats, ...[action.payload]]
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChats.pending, (state) => {
            console.log("[FETCH CHATS] pending");
        });
        builder.addCase(fetchChats.fulfilled, (state, action: PayloadAction<any>) => {
            try {
                console.log("[FETCH CHATS] fulfilled", action);
                if (!action.payload) throw new Error("Something went wrong");
                console.log(action.payload)
                state.chats = action.payload;
            } catch (e) {
                //
            }
        });
        builder.addCase(fetchChats.rejected, () => {
            console.log("[FETCH CHATS] rejected");
        });
    }
});

export const { setCurrentChat, onlineFriends, receivedMessage, senderTyping, createChat } = chatSlice.actions;
export default chatSlice.reducer;