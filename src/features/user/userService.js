import axios from "axios";

const API_URL = "https://librarymngsys.adaptable.app/api/user";

const getAllBooks = async ({ query, token, signal }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  };
  const result = "?" + new URLSearchParams(query).toString();
  const response = await axios.get(API_URL + "/all" + result, config);
  return response.data;
};

const getIssuedBooks = async ({ token, signal }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  };
  const response = await axios.get(API_URL + "/", config);
  return response.data;
};

const requestedBooks = async ({ token, signal }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  };
  const response = await axios.get(API_URL + "/requested", config);
  return response.data;
};

const requestBook = async ({ token, id }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + `/request/${id}`, {}, config);
  return response.data;
};

const cancelRequest = async ({ token, id }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + `/cancel/${id}`, {}, config);
  return response.data;
};

const bookDetails = async ({ id, token, signal }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  };
  const response = await axios.get(API_URL + `/book/${id}`, config);
  return response.data;
};

const relatedBooks = async ({ data, token, signal }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  };
  const result = "?" + new URLSearchParams(data).toString();
  const response = await axios.get(API_URL + "/related" + result, config);
  return response.data;
};

const unsubscribe = async ({ id, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + `/unsubscribe/${id}`,
    {},
    config
  );
  return response.data;
};

const forgotLink = async ({ email }) => {
  const response = await axios.post(API_URL + "/forgotlink", { email });
  return response.data;
};

const forgotPass = async (data) => {
  const response = await axios.post(API_URL + "/forgotpass", data);
  return response.data;
};

const addToWish = async ({ id, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + `/addwish/${id}`, {}, config);
  return response.data;
};

const getWish = async ({ token, signal }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  };
  const response = await axios.get(API_URL + "/wishlist", config);
  return response.data;
};

const removefromWish = async ({ id, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + `/remove/${id}`, {}, config);
  return response.data;
};

const contact = async ({ data, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "/contact", data, config);
  return response.data;
};

const subscribe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "/subscribe", {}, config);
  return response.data;
};

const getComments = async ({ id, token, signal }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  };
  const response = await axios.get(API_URL + `/comments/${id}`, config);
  return response.data;
};

const deleteComment = async ({ data, token }) => {
  const response = await axios.delete(API_URL + `/delete-comment/${data.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { bookID: data.bookID },
  });
  return response.data;
};

const addReview = async ({ data, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "/add-review", data, config);
  return response.data;
};

const modifyComment = async ({ data, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + `/update-comment/${data.commentID}`,
    { comment: data.comment, bookID: data.bookID },
    config
  );
  return response.data;
};

const userService = {
  getAllBooks,
  getIssuedBooks,
  requestedBooks,
  requestBook,
  cancelRequest,
  bookDetails,
  relatedBooks,
  unsubscribe,
  forgotLink,
  forgotPass,
  addToWish,
  getWish,
  removefromWish,
  contact,
  subscribe,
  getComments,
  deleteComment,
  addReview,
  modifyComment,
};

export default userService;
