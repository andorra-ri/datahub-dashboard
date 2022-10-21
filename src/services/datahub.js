import axios from 'axios';

export default axios.create({
  baseURL: '/api/v0.1',
  timeout: 60000,
});
