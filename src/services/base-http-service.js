import axios from 'axios';
import * as env from '../environment';

const { API_URL } = 'https://porra-api.herokuapp.com';
//const { API_URL } = env[process.env.REACT_APP_ENVIRONMENT] || 'http:localhost:3001';
const http = axios.create({
  baseURL: 'https://porra-api.herokuapp.com'
});


export default http;
