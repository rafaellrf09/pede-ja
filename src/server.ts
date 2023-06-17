import { config } from "dotenv";
import { app } from "./app";
import { connectToMongoDB } from "./config/mongodb";
import { connection } from "mongoose";
import OrderMessageChannel from "./messages/OrderMessageChannel";

const createServer = async () => {
    config();
    connectToMongoDB();

    const PORT = process.env.PORT || 3001;
    const server = app.listen(PORT, () => {
        console.log(`App running on port ${PORT}`);
    });

    const orderMsgChannel = new OrderMessageChannel(server);
    await orderMsgChannel.consumeMessages();

    process.on('SIGINT', async () => {
        await connection.close();
        server.close();
        console.log("App server and MongoDb are closed")
    })
}

createServer();
