import axios from "axios";

const API_URL = "https://librarymngsys.adaptable.app/api/admin";

const getAllBooks = async ({ data, token, signal }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  };
  const result = "?" + new URLSearchParams(data).toString();
  const response = await axios.get(API_URL + "/" + result, config);
  return response.data;
};

const requested = async ({ data, token, signal }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  };
  const result = "?" + new URLSearchParams(data).toString();
  const response = await axios.get(API_URL + "/requested" + result, config);
  return response.data;
};

const issueBook = async ({ data, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + `/issue/${data.id}`,
    { userId: data.user_id },
    config
  );
  return response.data;
};

const returnBook = async ({ data, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + `/return/${data.id}`,
    { userId: data.userId },
    config
  );
  return response.data;
};

const issuedBooks = async ({ id, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = "?" + new URLSearchParams({ bookID: id }).toString();
  const response = await axios.get(API_URL + "/issued" + result, config);
  return response.data;
};

const unIssuedBooks = async ({ id, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = "?" + new URLSearchParams({ bookID: id }).toString();
  const response = await axios.get(API_URL + "/unissued" + result, config);
  return response.data;
};

const addBook = async ({ bookData, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, bookData, config);
  return response.data;
};

const deleteBook = async ({ id, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + `/${id}`, config);
  return response.data;
};

const allUsers = async ({ data, token, signal }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  };
  const result = "?" + new URLSearchParams(data).toString();
  const response = await axios.get(API_URL + "/users" + result, config);
  return response.data;
};

const deleteUser = async ({ id, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + `/user/${id}`, config);
  return response.data;
};

const cancelRequest = async ({ data, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + `/cancel/${data.bookID}`,
    { id: data.id },
    config
  );
  return response.data;
};

const Subscribers = async ({ data, token, signal }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  };
  const result = "?" + new URLSearchParams(data).toString();
  const response = await axios.get(API_URL + "/subscribers" + result, config);
  return response.data;
};

const newsLetter = async ({ data, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "/news", data, config);
  return response.data;
};

const dueBooks = async ({ data, token, signal }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  };
  const result = "?" + new URLSearchParams(data).toString();
  const response = await axios.get(API_URL + "/duebooks" + result, config);
  return response.data;
};

const activityLogs = async ({ data, token, signal }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  };
  const result = "?" + new URLSearchParams(data).toString();
  const response = await axios.get(API_URL + "/logs" + result, config);
  return response.data;
};

const block = async ({ id, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + `/block/${id}`, {}, config);
  return response.data;
};

const unblock = async ({ id, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + `/unblock/${id}`, {}, config);
  return response.data;
};

const updateStock = async ({ data, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + `/update/${data.id}`,
    { stock: data.quantity, action: data.action },
    config
  );
  return response.data;
};

const notifyBookDefaulties = async ({ data, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "/notify", data, config);
  return response.data;
};

const blockedUsers = async ({ data, token, signal }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  };
  const result = "?" + new URLSearchParams(data).toString();
  const response = await axios.get(API_URL + "/blocked" + result, config);
  return response.data;
};

const adminService = {
  getAllBooks,
  requested,
  issueBook,
  returnBook,
  issuedBooks,
  unIssuedBooks,
  addBook,
  deleteBook,
  allUsers,
  deleteUser,
  cancelRequest,
  Subscribers,
  newsLetter,
  dueBooks,
  activityLogs,
  block,
  unblock,
  updateStock,
  notifyBookDefaulties,
  blockedUsers,
};

export default adminService;
