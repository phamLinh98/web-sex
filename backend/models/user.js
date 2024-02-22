import { Schema, model } from "mongoose";
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  name: String
});

const User = model("User", userSchema);
export default User;
