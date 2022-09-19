import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthService } from '../services/communicationService';

interface RegisterState {
    user: object;
    token: string;
    isLoggedIn: boolean;
}

const initialState: RegisterState = {
    user: {},
    token: "",
    isLoggedIn: false
}

export const register = createAsyncThunk("register", async (props: {email: string; password: string, firstName: string, lastName: string, gender: string}) => {
    const response = await AuthService.register({ email: props.email, password: props.password, firstName: props.firstName, lastName: props.lastName, gender: props.gender });
    console.log(response)
    return response;
});

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            console.log("[REGISTER] pending");
            state.isLoggedIn = false;
        });
        builder.addCase(register.fulfilled, (state, action: PayloadAction<RegisterState>) => {
            console.log("[REGISTER] fulfilled", action);
            if (!action.payload) throw new Error("Something went wrong");
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        });
        builder.addCase(register.rejected, () => {
            console.log("[REGISTER] rejected");
        });
    }
});

export default registerSlice.reducer;