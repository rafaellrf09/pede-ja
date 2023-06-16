import * as express from "express";
import { orderRouter } from "./routes/order";
import { itemRouter } from "./routes/item";

export const app = express();

// Middleware logic
function mediator(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log(`Request Type: ${req.method} - ${req.url}`)
    next()
}

app.use(mediator)
    .use(express.json())
    .use('/', orderRouter)
    .use('/', itemRouter);
