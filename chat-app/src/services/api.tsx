import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
    }
});

API.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        if (err.response.status === 401) {
            throw err;
        }
        if (typeof err.response.data.error.name === "undefined") {
            if (err.response.data.name === "TokenExpiredError") {
                throw err;
            }
        }
    }
)

export default API;