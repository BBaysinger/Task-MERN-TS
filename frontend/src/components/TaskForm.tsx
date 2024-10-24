import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createTask } from "features/tasks/taskSlice";
import { AppDispatch } from "app/store";

const TaskForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = {
      id: Date.now().toString(), // Generate a unique ID (or use your method)
      text,
      completed: false, // Assuming the task is not completed initially
      title: "Mock Title",
      description: "Mock description.",
    };
    dispatch(createTask(newTask));
    setText("");
    navigate("/alltasks");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text" style={{ fontWeight: "bolder" }}>
            Enter Task
          </label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Task
          </button>
        </div>
      </form>
    </section>
  );
};

export default TaskForm;
