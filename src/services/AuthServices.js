//import {envConfig} from '../configs/envConfig.js';
import axios from "axios";
export async function loginWithSSO(accessToken) {
  //const api = envConfig.host + ':' + envConfig.port + '/sso-login';
  const api = "http://localhost:3344/sso-login";
  axios.defaults.withCredentials = true;
  await axios.post(api, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: "application/json",
    },
    withCredentials: true,
  });
}

export async function loginWithAccount(email, password) {
  const api = "http://localhost:3344/login";
  axios.defaults.withCredentials = true;
  await axios.post(
    api,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        ContentType: 'application/json',
      },
    },
  );
}

export async function getUserInfo() {
  const api = "http://localhost:3344/api/users";
  axios.defaults.withCredentials = true;
  const response = await axios.get(api);
  return response.data;
}
