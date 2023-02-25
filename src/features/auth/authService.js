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

const editDetails = async ({ data, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "/edit-details", data, config);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  editDetails,
};

export default authService;
