import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import TaskItem from "./TaskItem";
import { Task } from "features/tasks/taskService";

describe("TaskItem", () => {
  const task: Task = {
    _id: "task-123",
    text: "Learn Blockchain",
    user: "QWER23452354QQSDFLJASDF",
    createdAt: "2023-07-09T10:00:00",
    updatedAt: "2023-06-30T03:38:15.287Z",
    __v: 0,
  };

  const mockStore = configureStore([]);
  const store = mockStore({});

  test("renders task details correctly", () => {
    const { getByText } = render(
      <Provider store={store}>
        <TaskItem task={task} />
      </Provider>
    );

    expect(getByText(task.text)).toBeInTheDocument();
    expect(
      getByText(new Date(task.createdAt).toLocaleString("en-US"))
    ).toBeInTheDocument();
  });
});
