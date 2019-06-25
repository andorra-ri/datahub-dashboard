import Axios from 'axios';

// Airtable API connection
const datahub = Axios.create({
	baseURL: process.env.VUE_APP_ROOT_API,
	timeout: 5000,
});

export default datahub;
