import axios from 'axios';

const URL = axios.create({
    baseURL: "http://localhost:3000"
});

export default URL;