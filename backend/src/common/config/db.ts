import mongoose from "mongoose";

import { env } from "../env.js";

async function connectDb() {
    await mongoose.connect(env.MONGODB_CONNECTION_URI);
    console.log("Database Connected!!")
}

export default connectDb;