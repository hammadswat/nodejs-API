import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const mongoUrl = process.env.Mongodb

mongoose.connect(mongoUrl)

export default mongoose