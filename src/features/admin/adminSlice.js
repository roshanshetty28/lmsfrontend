import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";
import { toast } from "react-toastify";

const successful = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const unsuccessful = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const initialState = {
  inventory: [],
  requestedBooks: [],
  issued: {},
  unissued: {},
  users: [],
  subscribers: [],
  duebooks: [],
  logs: [],
  page: 1,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllBooks = createAsyncThunk(
  "admin/getAllBooks",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return adminService.getAllBooks({ data, token });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const reqBooks = createAsyncThunk(
  "admin/requested",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.requested(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const issueBook = createAsyncThunk(
  "admin/issue",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return adminService.issueBook({ data, token });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const returnBook = createAsyncThunk(
  "admin/return",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.returnBook({ data, token });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const issuedBooks = createAsyncThunk(
  "async/issued",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.issuedBooks({ id, token });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unIssuedBooks = createAsyncThunk(
  "async/unissued",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.unIssuedBooks({ id, token });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addBook = createAsyncThunk(
  "admin/addBook",
  async (bookData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.addBook({ bookData, token });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "admin/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.deleteBook({ id, token });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allUsers = createAsyncThunk(
  "admin/allUsers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.allUsers(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.deleteUser({ id, token });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cancelRequest = createAsyncThunk(
  "admin/CancelReq",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.cancelRequest({ data, token });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSubscribers = createAsyncThunk(
  "admin/subscribers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.Subscribers(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const newsLetter = createAsyncThunk(
  "admin/news",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.newsLetter({ data, token });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const dueBooks = createAsyncThunk(
  "admin/dueBooks",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.dueBooks(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const activityLogs = createAsyncThunk(
  "admin/logs",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.activityLogs(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const block = createAsyncThunk("admin/block", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await adminService.block({ id, token });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const unblock = createAsyncThunk(
  "admin/unblock",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.unblock({ id, token });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateStock = createAsyncThunk(
  "admin/updateStock",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.updateStock({ data, token });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAdmin: (state) => {
      state.inventory = [];
      state.requestedBooks = [];
      state.issued = {};
      state.unissued = {};
      state.users = [];
      state.subscribers = [];
      state.duebooks = [];
      state.logs = [];
      state.page = 1;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.inventory = action.payload.books;
        state.page = action.payload.total;
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(issueBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(issueBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issued = action.payload;
        state.requestedBooks = state.requestedBooks.filter(
          (book) => book._id !== action.payload._id
        );
        toast.success("Book Issue Successful!", successful);
      })
      .addCase(issueBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(
          "Book Issue Unsuccessful. Reason: " + state.message,
          unsuccessful
        );
      })
      .addCase(returnBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        state.issued = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Book Return Successful", successful);
      })
      .addCase(returnBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(
          "Book Return Unsuccessful. Reason: " + state.message,
          unsuccessful
        );
      })
      .addCase(issuedBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(issuedBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issued = action.payload;
      })
      .addCase(issuedBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.issued = {};
        state.message = action.payload;
        toast.error(state.message, unsuccessful);
      })
      .addCase(unIssuedBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unIssuedBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.unissued = action.payload;
      })
      .addCase(unIssuedBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.unissued = {};
        state.message = action.payload;
        toast.error(state.message, unsuccessful);
      })
      .addCase(reqBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reqBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.requestedBooks = action.payload;
      })
      .addCase(reqBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBook.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Book Successfully Added to Inventory", successful);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(
          "Could not add Book. Reason: " + state.message,
          unsuccessful
        );
      })
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.inventory = state.inventory.filter(
          (book) => book._id !== action.payload.id
        );
        toast.success("Book Deleted Successfully.", successful);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(
          "Could not delete Book. Reason: " + state.message,
          unsuccessful
        );
      })
      .addCase(allUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.filter(
          (user) => user._id !== action.payload.id
        );
        toast.success("User Deleted Successfully.", successful);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(
          "Could not delete User. Reason: " + state.message,
          unsuccessful
        );
      })
      .addCase(cancelRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload._id);
        state.requestedBooks = state.requestedBooks.filter(
          (book) => book._id !== action.payload._id
        );
        toast.success("Request Cancelled Successfully.", successful);
      })
      .addCase(cancelRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload._id);
        toast.error(
          "Could not cancel request. Reason: " + state.message,
          unsuccessful
        );
      })
      .addCase(getSubscribers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubscribers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action);
        state.subscribers = action.payload;
      })
      .addCase(getSubscribers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(newsLetter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newsLetter.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("News Sent to Successfully", successful);
      })
      .addCase(newsLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(
          "Could not send news. Reason: " + state.message,
          unsuccessful
        );
      })
      .addCase(dueBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(dueBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.duebooks = action.payload;
      })
      .addCase(dueBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(activityLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activityLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.logs = action.payload;
      })
      .addCase(activityLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(block.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(block.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.filter(
          (user) => user._id !== action.payload._id
        );
        state.users.push(action.payload);
        toast.success("User Blocked Successfully", successful);
      })
      .addCase(block.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(
          "Could not block user. Reason: " + state.message,
          unsuccessful
        );
      })
      .addCase(unblock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unblock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.filter(
          (user) => user._id !== action.payload._id
        );
        state.users.push(action.payload);
        toast.success("User Unblocked Successfully", successful);
      })
      .addCase(unblock.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(
          "Could not Unblock user. Reason: " + state.message,
          unsuccessful
        );
      })
      .addCase(updateStock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.inventory = state.inventory.filter(
          (book) => book._id !== action.payload._id
        );
        state.inventory.push(action.payload);
        toast.success("Stock Updated Successfully", successful);
      })
      .addCase(updateStock.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(
          "Could not update Stock. Reason: " + state.message,
          unsuccessful
        );
      });
  },
});

export const { resetAdmin } = adminSlice.actions;
export default adminSlice.reducer;
