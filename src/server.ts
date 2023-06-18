import { config } from "dotenv";
import { app } from "./app";
import { connectToMongoDB } from "./config/mongodb";
import { connection } from "mongoose";
import { initMessangers, rabbitMQClient } from "./messages";

const createServer = async () => {
    config();
    connectToMongoDB();

    const PORT = process.env.PORT || 3001;
    const server = app.listen(PORT, () => {
        console.log(`App running on port ${PORT}`);
    });

    initMessangers(server);

    process.on('SIGINT', async () => {
        await connection.close();
        await rabbitMQClient.close();
        server.close();
        console.log("App server and MongoDb are closed")
    })
}

createServer();
