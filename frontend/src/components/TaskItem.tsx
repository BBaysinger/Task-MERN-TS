import { useDispatch } from "react-redux";

import { AppDispatch } from "app/store";
import { deleteTask } from "features/tasks/taskSlice";
import { Task } from "features/tasks/taskService";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="task">
      <div>{new Date(task.createdAt).toLocaleString("en-US")}</div>
      <h2>{task.text}</h2>
      <button onClick={() => dispatch(deleteTask(task._id))} className="close">
        X
      </button>
    </div>
  );
};

export default TaskItem;
