import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const Connection = () => {
  const uri = process.env.URI;
  try {
    mongoose.connect(uri);
    console.log("Database Connected");
  } catch (error) {
    console.error("Error connecting to DB!:", error);
    return;
  }
};

Connection();