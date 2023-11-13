import axios from "axios";

export const instance = axios.create({
    baseURL: "https://chat-app-server-u2qf.onrender.com/api/",
});

export const instanceAuth = axios.create({
    baseURL: "https://chat-app-server-u2qf.onrender.com/api/",
});

export const setAuthHeader = (token) => {
    instanceAuth.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
    instanceAuth.defaults.headers.common.Authorization = "";
};

