// import {envConfig} from '../configs/envConfig.js';
import axios from 'axios';
export async function loginSSO(accessToken) {
  //const api = envConfig.host + ':' + envConfig.port + '/sso-login';
  const api = 'http://localhost:3344/sso-login';
  axios.defaults.withCredentials = true;
  await axios.post(api, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  });
}
