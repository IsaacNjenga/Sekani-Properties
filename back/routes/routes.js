import express from "express";
import { firebaseGoogleLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/firebase-google-login", firebaseGoogleLogin);

export { router as Router };