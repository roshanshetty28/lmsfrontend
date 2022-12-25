import axios from "axios";

const API_URL = "https://librarymngsys.adaptable.app/api/actions";

const register = async (userData) => {
  const response = await axios.post(API_URL + "/register", userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "/login", userData);
  return response.data;
};

const logout = () => {
  localStorage.clear();
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
