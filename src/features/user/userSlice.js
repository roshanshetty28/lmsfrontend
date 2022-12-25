import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
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
  userBooks: [],
  userIssued: [],
  requested: [],
  related: [],
  book: {},
  wishlist: [],
  pages: 1,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllBooks = createAsyncThunk(
  "user/getAllBooks",
  async (query, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.getAllBooks({ query, token });
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

export const getIssuedBooks = createAsyncThunk(
  "user/getIssuedbooks",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.getIssuedBooks(token);
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

export const requestedBooks = createAsyncThunk(
  "user/requested",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.requestedBooks(token);
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

export const requestBook = createAsyncThunk(
  "user/requestBook",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.requestBook({ token, id });
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
  "user/cancelRequest",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.cancelRequest({ token, id });
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

export const bookDetails = createAsyncThunk(
  "user/book",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.bookDetails({ id, token });
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

export const relatedBooks = createAsyncThunk(
  "user/relatedBooks",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.relatedBooks({ data, token });
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

export const unsubscribe = createAsyncThunk(
  "user/unsubscribe",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.unsubscribe({ id, token });
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

export const forgotLink = createAsyncThunk(
  "user/forgotlink",
  async (email, thunkAPI) => {
    try {
      return await userService.forgotLink({ email });
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

export const forgotPass = createAsyncThunk(
  "user/forgotpass",
  async (data, thunkAPI) => {
    try {
      return await userService.forgotPass(data);
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

export const addToWish = createAsyncThunk(
  "user/addToWish",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.addToWish({ id, token });
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

export const getWish = createAsyncThunk("user/getWish", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await userService.getWish(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const removefromWish = createAsyncThunk(
  "user/removefromWish",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.removefromWish({ id, token });
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

export const contact = createAsyncThunk(
  "user/contact",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.contact({ data, token });
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

export const subscribe = createAsyncThunk(
  "user/subscribe",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.subscribe(token);
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

export const userBooksSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.userBooks = [];
      state.userIssued = [];
      state.requested = [];
      state.related = [];
      state.book = {};
      state.wishlist = [];
      state.pages = 1;
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
        state.userBooks = action.payload.books;
        state.pages = action.payload.total;
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getIssuedBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIssuedBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userIssued = action.payload;
      })
      .addCase(getIssuedBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(requestedBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestedBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.requested = action.payload;
      })
      .addCase(requestedBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(requestBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Book Request Successfully", successful);
      })
      .addCase(requestBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(
          "Could not request Request. Reason: " + state.message,
          unsuccessful
        );
      })
      .addCase(cancelRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Request Cancelled Successfully", successful);
      })
      .addCase(cancelRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(
          "Could not cancel Request. Reason: " + state.message,
          unsuccessful
        );
      })
      .addCase(bookDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bookDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.book = action.payload;
      })
      .addCase(bookDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(relatedBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(relatedBooks.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.related = action.payload;
      })
      .addCase(relatedBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(unsubscribe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unsubscribe.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Unsubscribed Sucessfully", successful);
      })
      .addCase(unsubscribe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(
          "Unsubscribe Unsuccessful. Reason: " + state.message,
          unsuccessful
        );
      })
      .addCase(forgotLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotLink.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success(" Email to Reset password sent Successfully", successful);
      })
      .addCase(forgotLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(
          "Password Reset Email sending Unsuccessfully. Reason: " +
            state.message,
          unsuccessful
        );
      })
      .addCase(forgotPass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPass.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Password Reset Successfully", successful);
      })
      .addCase(forgotPass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(
          "Password Reset Unsuccessfully. Reason: " + state.message,
          unsuccessful
        );
      })
      .addCase(addToWish.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWish.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist.push(action.payload);
        toast.success("Book Added to your wishlist", successful);
      })
      .addCase(addToWish.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(
          "Could not add Book to your wishlist. Reason: " + state.message,
          unsuccessful
        );
      })
      .addCase(getWish.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWish.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(getWish.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removefromWish.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removefromWish.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist = state.wishlist.filter(
          (book) => book._id === action.payload[0]
        );
        toast.success("Book Removed from your wishlist", successful);
      })
      .addCase(removefromWish.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(
          "Could not add Book to your wishlist. Reason: ",
          unsuccessful
        );
      })
      .addCase(contact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(contact.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Email Sent Successfully", successful);
      })
      .addCase(contact.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        toast.error("Could not contact. Reason :", unsuccessful);
      })
      .addCase(subscribe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(subscribe.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(subscribe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetUser } = userBooksSlice.actions;
export default userBooksSlice.reducer;
