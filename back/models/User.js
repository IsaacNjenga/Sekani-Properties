import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    password: { type: String },
  },
  { collection: "web_users", timestamps: true }
);

const UserModel = mongoose.model("web-users", userSchema);

export default UserModel;
