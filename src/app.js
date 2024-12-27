import express from "express";
import databaseConnection from "./config/db.js";
import routes from "./routes/index.js";

const connection = await databaseConnection();

connection.on("error", (error) => {
  console.error("Database connection failed: \n", error);
});

connection.once("open", () => {
  console.log("Database connected with success!");
});

const app = express();
routes(app);

app.use(express.json());

export default app;
