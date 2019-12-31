import axios from 'axios';
//import * as env from '../environment';

// const { API_URL } = 'https://porra-api.herokuapp.com';
//const  API_URL  =  'https://porra-api.herokuapp.com';
const http = axios.create({
  // baseURL: 'http://localhost:3001',
  baseURL: 'https://porra-api.herokuapp.com',
  withCredentials: true,
});


export default http;
