export default function authHeader(token) {
  // return authorization header with jwt token
  if (typeof token === "undefined") {
    let user = JSON.parse(sessionStorage.getItem("user"));
    token = user.token;
  }
  if (token) {
    return "Token " + token;
  } else {
    return null;
  }
}
