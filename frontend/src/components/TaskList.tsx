import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getTasks, reset } from "../features/tasks/taskSlice";
import TaskItem from "./TaskItem";
import Spinner from "./Spinner";
import { RootState } from "app/store";
import type { AppDispatch } from "app/store";

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { tasks, isLoading, isError, message } = useSelector(
    (state: RootState) => state.tasks,
  );

  useEffect(() => {
    if (isError) console.log(message);
    dispatch(getTasks());
    // Cleanup function, just call the dispatch without returning it
    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);

  return isLoading ? (
    <Spinner />
  ) : (
    <section className="content">
      {tasks.length > 0 && (
        <div className="tasks">
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TaskList;
