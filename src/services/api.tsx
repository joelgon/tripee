import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-dev.tripeeapp.com/admin'
})

export default api