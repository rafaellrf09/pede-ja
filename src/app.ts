import * as express from "express";

export const app = express();

// Middleware logic
function mediator(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('Request Type:', req.method)
    next()
}

app.use(mediator)
    .use(express.json())
