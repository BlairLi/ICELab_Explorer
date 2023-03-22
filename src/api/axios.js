import axios from 'axios';
const BASE_URL = 'http://Cisc498-env.eba-r9edeqnn.us-east-1.elasticbeanstalk.com';
// const BASE_URL = 'http://localhost:3500';


export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});