import mongoose from "mongoose";
import 'dotenv/config';



const connectDB = async(uri : string) => {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        const connectionInstance = await mongoose.connect(uri, {dbName : process.env.DB_NAME});
        console.log("mongoDB connected !! DB HOST: "+ connectionInstance.connection.host);
    } catch (error) {
        console.log(error);
    } finally {
        // Ensures that the client will close when you finish/error
        await mongoose.disconnect();
    }
}

export default connectDB;