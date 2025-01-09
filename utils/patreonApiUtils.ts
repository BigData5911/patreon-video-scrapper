import axios from 'axios';
import { PATREON_COOKIE } from '../config';

// Create an Patreon Axios instance
const patreonApi = axios.create({
    withCredentials: true // Ensure credentials (cookies) are sent with every request
});

// Add an interceptor if you need to include specific cookies
patreonApi.interceptors.request.use(config => {
    config.headers['Cookie'] = PATREON_COOKIE; // Set the cookie in the header
    config.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'; // Set the user agent
    return config;
}, error => {
    return Promise.reject(error);
});

export { patreonApi };