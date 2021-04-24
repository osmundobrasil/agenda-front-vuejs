import axios from 'axios'

//Definição da URL para acessar a API
export const http = axios.create({
    baseURL: 'https://contato-restapi.herokuapp.com/api/',
});