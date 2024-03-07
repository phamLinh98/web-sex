import { envConfig } from "../configs/envConfig";
export async function loginSSO(accessToken) {
  // POST request to the backend localhost:3344/sso-login with the access token header bearer token is accessToken
  const api = envConfig.host + ":" + envConfig.port + "/sso-login";
  const response = await fetch(api, {
    method: "POST",
    headers: {
      //"Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      credentials: "include",
    },
  });
  return response;
}
