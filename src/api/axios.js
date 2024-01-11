import axios from 'axios';
// Backend URL
//
// const BASE_URL = 'http://Cisc498-env.eba-r9edeqnn.us-east-1.elasticbeanstalk.com';
// const BASE_URL = 'http://Cisc498testing-env.eba-tjww5nka.us-east-1.elasticbeanstalk.com';
// const BASE_URL = 'http://498autentication-env.eba-w49fafyt.us-east-1.elasticbeanstalk.com';
// const BASE_URL = 'http://localhost:3500';
const BASE_URL = 'https://vercel-icel-ab.vercel.app';
// const BASE_URL = 'https://icelab-explorer.netlify.app';
// const BASE_URL = 'https://node-js-tutorial-series2-wofq5jfa6a-uc.a.run.app';
// const BASE_URL = 'http://localhost:3000';
// const BASE_URL = 'https://testing.d33784y2zyhj3.amplifyapp.com/';
// const BASE_URL = 'http://52.91.184.60';
// const BASE_URL = 'http://ec2-52-91-184-60.compute-1.amazonaws.com';



export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});