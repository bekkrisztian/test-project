import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthService } from '../services/communicationService';

interface AuthState {
    user: object;
    token: string;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem("user") as string) || {},
    token: localStorage.getItem("token") || "",
    isLoggedIn: !!JSON.parse(localStorage.getItem("user") as string)
}

export const login = createAsyncThunk("login", async (props: {email: string, password: string}) => {
    const response = await AuthService.login({email: props.email, password: props.password});
    return response;
});

export const updateProfile = createAsyncThunk("updateProfile", async (data: any) => {
    const response = await AuthService.updateProfile(data);
    return response;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, action: PayloadAction<any>) => {
            AuthService.logout();
            return {
                ...state,
                user: {},
                token: "",
                isLoggedIn: false,
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            console.log("[AUTH] pending");
            state.isLoggedIn = false;
        });
        builder.addCase(login.fulfilled, (state, action: PayloadAction<AuthState>) => {
            console.log("[AUTH] fulfilled", action);
            if (!action.payload) throw new Error("Something went wrong");
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        });
        builder.addCase(login.rejected, () => {
            console.log("[AUTH] rejected");
        });
        builder.addCase(updateProfile.fulfilled, (state, action: PayloadAction<any>) => {
            console.log("[USER UPDATE] fulfilled", action);
            try {
                if (!action.payload) {
                    throw new Error("Something went wrong");
                }
                console.log(state, action.payload);
                state.user = action.payload;
            } catch (e) {
                console.log(e);
            }
        });
        builder.addCase(updateProfile.rejected, () => {
            console.log("[USER UPDATE] rejected");
        });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;