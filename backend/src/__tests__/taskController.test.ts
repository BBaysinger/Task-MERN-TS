import request from "supertest";

import app from "./app.test";
import Task from "models/taskModel";
import User from "models/userModel";

jest.mock("models/taskModel");
jest.mock("models/userModel");

describe("Task Controller (with SuperTest)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should get tasks for a user", async () => {
    const tasks = [
      { _id: "task-id-1", text: "Task 1", user: "user-id" },
      { _id: "task-id-2", text: "Task 2", user: "user-id" },
    ];

    jest.spyOn(Task, "find").mockReturnValue({
      exec: jest.fn().mockResolvedValue(tasks),
    } as any);

    await request(app)
      .get("/api/tasks")
      .set("Authorization", "Bearer mock-token") // Mock JWT if needed
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual(tasks);
      });
  });

  test("should set a new task for a user", async () => {
    const task = { _id: "new-task-id", text: "New Task", user: "user-id" };

    jest.spyOn(Task.prototype, "save").mockResolvedValue(task);

    await request(app)
      .post("/api/tasks")
      .send({ text: "New Task" })
      .set("Authorization", "Bearer mock-token")
      .expect(201)
      .expect(res => {
        expect(res.body).toEqual(task);
      });
  });

  test("should return a 400 error for missing task text", async () => {
    await request(app)
      .post("/api/tasks")
      .send({})
      .set("Authorization", "Bearer mock-token")
      .expect(400)
      .expect(res => {
        expect(res.body.message).toBe("Please enter a task");
      });
  });

  test("should return a 401 error if user is not found", async () => {
    jest.spyOn(User, "findById").mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    } as any);

    await request(app)
      .put("/api/tasks/task-id-1")
      .send({ text: "Updated Task" })
      .set("Authorization", "Bearer mock-token")
      .expect(401)
      .expect(res => {
        expect(res.body.message).toBe("No such user found");
      });
  });

  test("should return a 401 error if user is not authorized to update the task", async () => {
    const taskToUpdate = { _id: "task-id-1", text: "Original Task", user: "user-id-1" };

    jest.spyOn(Task, "findById").mockReturnValue({
      exec: jest.fn().mockResolvedValue(taskToUpdate),
    } as any);

    jest.spyOn(User, "findById").mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: "user-id-2" }),
    } as any);

    await request(app)
      .put("/api/tasks/task-id-1")
      .send({ text: "Updated Task" })
      .set("Authorization", "Bearer mock-token")
      .expect(401)
      .expect(res => {
        expect(res.body.message).toBe("User is not authorized to update");
      });
  });
});
