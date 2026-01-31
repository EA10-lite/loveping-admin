import axios from "axios";
import { getAuthToken, removeAuthToken } from "../utils/cookies";

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

client.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            removeAuthToken();
            window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    }
);

export default client;