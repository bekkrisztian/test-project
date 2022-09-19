import API from "./api";

export const AuthService = {
    login: async (data: { email: string; password: string }) => {
        try {
            const { data: data_1 } = await API.post("/login", data);
            setHeadersAndStorage(data_1);
            return data_1;
        } catch (err) {
            console.error(`[LOGIN] Auth service error: ${err}`);
        }
    },
    register: async (data: { email: string; password: string, firstName: string, lastName: string, gender: string }) => {
        try {
            const { data: data_1 } = await API.post("/register", data);
            setHeadersAndStorage(data_1);
            return data_1;
        } catch (err) {
            console.error(`[REGISTER] Auth service error: ${err}`);
        }
    },
    logout: () => {
        API.defaults.headers.common["Authorization"] = ``;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        location.reload();
    },
    updateProfile: async (data: any) => {
        const headers = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }
        try {
            console.log(data)
            const { data: data_1 } = await API.post("/users/update", data, headers);
            localStorage.setItem("user", JSON.stringify(data_1));
            return data_1;
        } catch (err) {
            console.error(`[UPDATE PROFILE] Auth service error: ${err}`);
        }
    }
}

const setHeadersAndStorage = (props: {user: any, token: string}) => {
    API.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
    localStorage.setItem("user", JSON.stringify(props.user));
    localStorage.setItem("token", props.token);
}

export const ChatService = {
    fetchChats: async () => {
        try {
            const getChats = await API.post("/chats");
            return getChats;
        } catch (err) {
            location.reload();
            console.error(`[FETCH CHAT] Chat service error: ${err}`);
        }
    },
    uploadImage: async (data: any) => {
        const headers = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }
        try {
            const { data: data_1 } = await API.post("/chats/upload-image", data, headers);
            return data_1.url;
        } catch (err) {
            console.error(`[FETCH CHAT] Chat service error: ${err}`);
        }
    },
    searchUsers: async (term: any) => {
        try {
            const res = await API.get("/users/search-user", {
                params: {
                    term
                }
            });
            return res.data;
        } catch (err) {
            console.error(`[SEARCH USER] Chat service error: ${err}`);
        }
    },
    createChat: async (partnerId: any) => {
        try {
            const res = await API.post("/chats/create", {partnerId});
            return res.data;
        } catch (err) {
            console.error(`[CREATE CHAT] Chat service error: ${err}`);
        }
    }
}