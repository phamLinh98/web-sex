import { Schema, model } from "mongoose";
// const Sample_Info_From_SSO = {
//   name: "Tuấn Linh Phạm",
//   picture:
//     "https://lh3.googleusercontent.com/a/ACg8ocI1l9Z3nghtrECOHb5IGfkkUqYwb0TwsHRPZIwB9WwD6Hg=s96-c",
//   iss: "https://securetoken.google.com/linhthusinh98xxx",
//   aud: "linhthusinh98xxx",
//   auth_time: 1708615420,
//   user_id: "kr4nCiKflqVOlsaA31MnTQT4hVt2",
//   sub: "kr4nCiKflqVOlsaA31MnTQT4hVt2",
//   iat: 1708615420,
//   exp: 1708619020,
//   email: "linhthusinh98@gmail.com",
//   email_verified: true,
//   firebase: {
//     identities: {
//       "google.com": ["102962640140900181568"],
//       email: ["linhthusinh98@gmail.com"],
//     },
//     sign_in_provider: "google.com",
//   },
// };

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  name: String,
  picture: String,
  user_id:String,
  type:{
    type:String,
    required:true
  }
});

const User = model("User", userSchema);
export default User;
