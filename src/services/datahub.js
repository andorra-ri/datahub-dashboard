import axios from 'axios';

// Airtable API connection
export default axios.create({
  baseURL: import.meta.env.VITE_DATAHUB_API_URL,
  timeout: 5000,
});
