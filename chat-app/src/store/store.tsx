import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from "./authSlice";
import chatSlice from "./chatSlice";
import registerSlice from "./registerSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        regiter: registerSlice,
        chat: chatSlice
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;