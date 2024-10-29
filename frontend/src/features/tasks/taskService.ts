import axios from "axios";

const API_URL = "/api/tasks/";

// Only for creating tasks.
export interface TaskData {
  text: string;
}

// For an established task.
export interface Task extends TaskData {
  _id: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const createTask = async (taskData: TaskData, token: string): Promise<Task> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(API_URL, taskData, config);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

const getTasks = async (token: string): Promise<Task[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

const deleteTask = async (id: string, token: string): Promise<string> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    await axios.delete(`${API_URL}${id}`, config);
    return id;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

const taskService = { createTask, getTasks, deleteTask };

export default taskService;
