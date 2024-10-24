import axios from "axios";

const API_URL = "/api/tasks/";

// Type for creating a task (info sent to server)
export interface TaskData {
  title: string;
  description: string;
}

// Type for a full task entity returned from the server
export interface Task {
  _id: string; // Unique identifier for the task
  title: string;
  text: string;
  description: string; // This might be unused ('text' property maybe instead). TODO: Determine that.
  createdAt: string; // ISO string or Date object, depending on your implementation
  updatedAt: string; // ISO string or Date object
}

const createTask = async (taskData: TaskData, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, taskData, config);
  return response.data;
};

const getTasks = async (token: string) => {
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

const deleteTask = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

const taskService = { createTask, getTasks, deleteTask };

export default taskService;
