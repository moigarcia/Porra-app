import axios from 'axios';
import * as env from '../environment';

// const { API_URL } = 'https://porra-api.herokuapp.com';
const  API_URL  =  'https://porra-api.herokuapp.com';
const http = axios.create({
  baseURL: API_URL
});


export default http;
