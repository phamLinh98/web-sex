export const getCookieToken = (req, res) => {
  const cookies = {};
  if (!req.headers.cookie) return cookies;
  req.headers.cookie.split(";").forEach((cookie) => {
    const [key, value] = cookie.split("=");
    cookies[key.trim()] = value; // Sử dụng key.trim() để loại bỏ khoảng trắng từ key
  });
  return cookies;
};

export function clearCookies(res) {
  res.clearCookie("token");
}

export function validateRegisterInput(email, password) {
  // Validate email and password with regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
}
