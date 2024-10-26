import asyncHandler from "express-async-handler";
import Task from "models/taskModel";
import User from "models/userModel";

export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user?._id });
  res.status(200).json(tasks);
});

export const setTask = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please enter a task");
  }

  const task = await Task.create({ text: req.body.text, user: req.user?._id });
  res.status(200).json(task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    res.status(401);
    throw new Error("No such user found");
  }

  if (task.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User is not authorized to update");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTask);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    res.status(401);
    throw new Error("No such user found");
  }

  if (task.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User is not authorized to update");
  }

  await Task.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});