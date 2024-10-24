import axios from "axios";
const API_URL = "/api/users/";

interface UserData {
  username: string;
  email: string;
  password: string;
}

const register = async (userData: UserData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData: UserData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => localStorage.removeItem("user");

const authService = { register, logout, login };

export default authService;
