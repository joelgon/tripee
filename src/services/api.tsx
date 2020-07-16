import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-dev.tripeeapp.com'
})

export default api