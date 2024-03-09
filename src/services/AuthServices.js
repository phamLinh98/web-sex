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
      withCredentials: true,
    },
    {
      headers: {
        ContentType: "application/json",
      },
    }
  );
}
