export const getCookieToken = (req, res) => {
  const cookies = {};
  if (!req.headers.cookie) return cookies;
  req.headers.cookie.split(";").forEach((cookie) => {
    const [key, value] = cookie.split("=");
    cookies[(key, trim())] = value;
  });
  return cookies;
};
