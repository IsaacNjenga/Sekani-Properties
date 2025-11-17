import express from "express";
import {
  firebaseGoogleLogin,
  Login,
  Register,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/firebase-google-login", firebaseGoogleLogin);
router.post("/sign-in", Login);
router.post("/sign-up", Register);

export { router as Router };
