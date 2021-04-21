import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://contato-restapi.herokuapp.com/api/',
});