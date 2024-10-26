import express from "express";
import { getTasks, setTask, updateTask, deleteTask } from "controllers/taskController";
import protect from "middleware/authMiddleware";

const expressRouter = express.Router();

expressRouter.get("/", protect, getTasks);
expressRouter.post("/", protect, setTask);
expressRouter.put("/:id", protect, updateTask);
expressRouter.delete("/:id", protect, deleteTask);

export default expressRouter;
