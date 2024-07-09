import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async(uri: string) => {
    try {
        const connectionInstance = await mongoose.connect(uri, {dbName: process.env.DB_NAME});
        console.log("MongoDB connected !! DB HOST: " + connectionInstance.connection.host);
    } catch (error) {
        console.log("MongoDB connection error:", error);
        process.exit(1);
    }
}

export default connectDB;