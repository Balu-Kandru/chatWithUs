import axios from "axios";

export const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:3000';


const apiClient = axios.create({
    baseURL: BASE_URL,
});

export { apiClient }