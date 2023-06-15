import { config } from "dotenv";
import { app } from "./app";
import { connectToMongoDB } from "./config/mongodb";

const createServer = async () => {
    config();
    const PORT = process.env.PORT || 3001;

    connectToMongoDB();

    app.listen(PORT, () => {
        console.log(`App running on port ${PORT}`);
    });
}

createServer();
