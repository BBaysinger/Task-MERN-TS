import { getTasks, setTask, updateTask } from "controllers/taskController";
import Task from "models/taskModel";
import User from "models/userModel";

jest.mock("models/taskModel");
jest.mock("models/userModel");

const createRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Task Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("gets tasks for the current user", async () => {
    const tasks = [
      { _id: "task-id-1", text: "Task 1", user: "user-id" },
      { _id: "task-id-2", text: "Task 2", user: "user-id" },
    ];

    (Task.find as unknown as jest.Mock).mockResolvedValue(tasks);

    const req: any = { user: { _id: "user-id" } };
    const res = createRes();

    await (getTasks as any)(req, res);

    expect(Task.find).toHaveBeenCalledWith({ user: "user-id" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(tasks);
  });

  test("creates a new task when text is provided", async () => {
    const createdTask = {
      _id: "new-task-id",
      text: "New Task",
      user: "user-id",
    };

    (Task.create as unknown as jest.Mock).mockResolvedValue(createdTask);

    const req: any = { user: { _id: "user-id" }, body: { text: "New Task" } };
    const res = createRes();

    await (setTask as any)(req, res);

    expect(Task.create).toHaveBeenCalledWith({ text: "New Task", user: "user-id" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(createdTask);
  });

  test("returns 400 when creating a task without text", async () => {
    const req: any = { user: { _id: "user-id" }, body: {} };
    const res = createRes();

    await expect((setTask as any)(req, res)).rejects.toThrow("Please enter a task");
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("returns 401 when updating a task and user does not exist", async () => {
    const taskToUpdate = {
      _id: "task-id-1",
      user: { toString: () => "user-id" },
    };

    (Task.findById as unknown as jest.Mock).mockResolvedValue(taskToUpdate);
    (User.findById as unknown as jest.Mock).mockResolvedValue(null);

    const req: any = {
      params: { id: "task-id-1" },
      user: { _id: "user-id" },
      body: { text: "Updated Task" },
    };
    const res = createRes();

    await expect((updateTask as any)(req, res)).rejects.toThrow("No such user found");
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test("returns 401 when updating a task user is not authorized", async () => {
    const taskToUpdate = {
      _id: "task-id-1",
      user: { toString: () => "owner-user-id" },
    };

    (Task.findById as unknown as jest.Mock).mockResolvedValue(taskToUpdate);
    (User.findById as unknown as jest.Mock).mockResolvedValue({ id: "user-id" });

    const req: any = {
      params: { id: "task-id-1" },
      user: { _id: "user-id" },
      body: { text: "Updated Task" },
    };
    const res = createRes();

    await expect((updateTask as any)(req, res)).rejects.toThrow(
      "User is not authorized to update",
    );
    expect(res.status).toHaveBeenCalledWith(401);
  });
});
