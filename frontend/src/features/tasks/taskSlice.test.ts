import { thunk, ThunkDispatch } from "redux-thunk";

import { RootState } from "app/store";
import { getTasks } from "./taskSlice";
import { Task } from "./taskService";
import taskService from "./taskService";
import configureMockStore from "redux-mock-store";
import { vi } from "vitest";

type FetchTasksSuccess = {
  type: "FETCH_TASKS_SUCCESS";
  payload: Task[];
};

type FetchTasksFailure = {
  type: "FETCH_TASKS_FAILURE";
  error: string;
};

// Combine into a union type
type TaskActions = FetchTasksSuccess | FetchTasksFailure;

type DispatchExts = ThunkDispatch<RootState, undefined, TaskActions>;

// Create the mock store with thunk middleware
const middleware: any = [thunk]; // This was a fiasco. Eventually typed to 'any'.
const mockStore = configureMockStore<RootState, DispatchExts>(middleware);

describe("taskSlice", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      tasks: {
        tasks: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: "",
      },
      auth: {
        user: {
          token: "mock_token",
          name: "Mock User",
          email: "mockuser@example.com",
          password: "mockpassword",
        },
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: "Mock message.",
      },
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  test("calls the taskService to fetch tasks", async () => {
    const token = "mock_token";
    const tasks: Task[] = [
      {
        _id: "649e4e271947362dc297436a",
        text: "Learn Tailwind",
        user: "649023b41935f5557f8e7ca4",
        createdAt: "2023-06-30T03:38:15.287Z",
        updatedAt: "2023-06-30T03:38:15.287Z",
        __v: 0,
      },
    ];

    // Mock the getTasks implementation
    const getTasksMock = vi.fn().mockResolvedValue(tasks);

    // Spy on the service and replace it with the mocked function
    vi.spyOn(taskService, "getTasks").mockImplementation(getTasksMock);

    // Dispatch the thunk with the token
    const action = await store.dispatch(getTasks());

    // Check if the mock was called correctly
    expect(getTasksMock).toHaveBeenCalledWith(token);
    expect(action.type).toBe("tasks/getAll/fulfilled");
  });
});
