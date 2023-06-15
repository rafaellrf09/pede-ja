import { config } from "dotenv";
import { connect } from "mongoose";

export const connectToMongoDB = async () => {
    config();
    try {
        await connect(process.env.MONGODB_CONNECTION_URL);
        console.log("MongoDb connected")
    } catch (error) {
        console.log("Error to connect on MongoDb")
        console.log(error)
    }
}