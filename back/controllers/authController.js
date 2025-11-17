import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import admin from "../config/FirebaseAdmin.js";
import UserModel from "../models/User.js";

dotenv.config();

const firebaseGoogleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ error: "Missing idToken" });

    //verify with firebase
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    //find user in DB
    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({
        firebaseUid: uid,
        email,
        name,
        avatar: picture,
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ success: true, token, user });
  } catch (error) {
    console.error("Error on login:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export { firebaseGoogleLogin };