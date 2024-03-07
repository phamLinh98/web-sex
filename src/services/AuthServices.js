<<<<<<< HEAD
import { envConfig } from "../configs/envConfig";
export async function loginSSO(accessToken) {
  // POST request to the backend localhost:3344/sso-login with the access token header bearer token is accessToken
  const api = envConfig.host + ":" + envConfig.port + "/sso-login";
  const response = await fetch(api, {
    method: "POST",
=======
import {envConfig} from '../configs/envConfig.js';
import axios from 'axios';
export async function loginSSO(accessToken) {
  const api = envConfig.host + ':' + envConfig.port + '/sso-login';
  axios.defaults.withCredentials = true;
  await axios.post(api, null, {
>>>>>>> parent of e1b2047 (fix bug fetch api error by axios FE)
    headers: {
      //"Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      credentials: "include",
    },
  });
  return response;
}
