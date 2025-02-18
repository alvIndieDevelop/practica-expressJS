import express, { Application } from "express";
import { createServer } from "http";
import "dotenv/config";

// middlewares
import cors from "cors";
import morgan from "morgan";

// routers
import Routers from "./router";
import { connectToDB } from "./config/mongodb";

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

connectToDB()
  .then(() => {
    console.log("Database connected");
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

export default app;
