import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://to-do-list-e3d41-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;