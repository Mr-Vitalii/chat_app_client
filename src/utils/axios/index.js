import axios from "axios";

export const instance = axios.create({
    baseURL: "http://localhost:5000/api/",
});

export const instanceAuth = axios.create({
    baseURL: "http://localhost:5000/api/",
});

export const setAuthHeader = (token) => {
    instanceAuth.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
    instanceAuth.defaults.headers.common.Authorization = "";
};

