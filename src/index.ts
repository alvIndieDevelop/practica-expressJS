import express, { Application } from "express";
import { createServer } from "http";

// middlewares
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";

// routers
import Routers from "./router";

const PORT = process.env.PORT || 5000;

const app: Application = express();
const server = createServer(app);

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routers
app.use(Routers);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
