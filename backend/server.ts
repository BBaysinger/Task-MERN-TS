import express from "express";
import errorHandler from "./src/middleware/errorMiddleware";
import dotenv from "dotenv";
import connectDB from "./src/connect/database";
import Cors from "cors";

const dotenvConfig = dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(Cors());

app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on ${port}`));
