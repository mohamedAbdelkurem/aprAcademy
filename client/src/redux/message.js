import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const initialState = {
  message: null,
  messages: [],
  loading: false,
  loadingMessage: false,
  errors: null,
  posted: false,
};

// ─── Get Messages ──────────────────────────────────────────────────────────────────────
export const getmessages = createAsyncThunk(
  "messages/getmessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/messages/`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// ─── Get message ──────────────────────────────────────────────────────────────────────
export const getmessage = createAsyncThunk(
  "messages/getmessage",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/message/${id}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── Crete a message ──────────────────────────────────────────────────────────────────────

export const createMessage = createAsyncThunk(
  "messages/createMessage",
  async ({ firstname, email, messageTitle, message }, { rejectWithValue }) => {
    try {
      const data = {
        firstname,
        email,
        messageTitle,
        message,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/messages/`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// delete a message
export const deleteMessage = createAsyncThunk(
  "messages/deletemessage",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/messages/${id}`
      );
      dispatch(getmessages());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    resetContactus(state) {
      state.posted = false;
    },
  },
  extraReducers: {
    //
    // ─── get messages ───────────────────────────────────────────────────────
    //
    [getmessages.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [getmessages.fulfilled]: (state, action) => {
      state.messages = action.payload;

      state.loading = false;
      state.errors = null;
    },
    [getmessages.rejected]: (state, action) => {
      state.messages = null;
      state.loading = false;
      state.errors = action.payload;
    },
    //
    // ─── get message ───────────────────────────────────────────────────────
    //
    [getmessage.pending]: (state) => {
      state.loadingMessage = true;
      state.errors = null;
    },
    [getmessage.fulfilled]: (state, action) => {
      state.message = action.payload;

      state.loadingMessage = false;
      state.errors = null;
    },
    [getmessage.rejected]: (state, action) => {
      state.message = null;
      state.loadingMessage = false;
      state.errors = action.payload;
    },
    // ─── Create message ───────────────────────────────────────────────────────
    //
    [createMessage.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [createMessage.fulfilled]: (state, action) => {
      state.messages = action.payload.messages;
      state.posted = true;
      state.loading = false;
      state.errors = null;
    },
    [createMessage.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [deleteMessage.pending]: (state) => {
      state.loadingDeleteing = true;
      state.loadingDeleteing = true;
      state.errors = null;
    },
    [deleteMessage.fulfilled]: (state, action) => {
      state.article = action.payload;
      state.loading = false;

      state.loadingDeleteing = false;
      state.errors = null;
    },
    [deleteMessage.rejected]: (state, action) => {
      state.article = null;
      state.loadingDeleteing = true;
      state.errors = action.payload;
    },
  },
});
export const { resetContactus } = messageSlice.actions;
export default messageSlice.reducer;
