import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
  users: [],
  loadingUsers: true,
  deleting: true,
  userCount: 0,
  finishedCount:0,
  notFinishedCount:0
};

// ─── GET USERS ──────────────────────────────────────────────────────────────────────
// @GET /api/users
export const get_users = createAsyncThunk(
  "users/get_users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/users/users`
      );
      let usersCount = response.data.length;
      let finishedCount = 0;
      response.data.map((element) => {
        if (element.graduated) finishedCount++;
      });
      let notFinishedCount = 0;
      response.data.map((element) => {
        if (!element.graduated) notFinishedCount++;
      });
      return { users: response.data, usersCount,finishedCount,notFinishedCount };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── GET USERS ──────────────────────────────────────────────────────────────────────
// @GET /api/users/teachers
export const get_teachers = createAsyncThunk(
  "users/get_teachers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/users/teachers`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── GET USERS ──────────────────────────────────────────────────────────────────────
// @GET /api/users/
export const get_top_users = createAsyncThunk(
  "users/get_top_users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/users/topusers`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const get_top_users_all = createAsyncThunk(
  "users/get_top_users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/users/topusersall`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// ─── DELETE USER ──────────────────────────────────────────────────────────────────────
// @GET /api/users/:id
export const delete_user = createAsyncThunk(
  "users/delete_user",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/users/${id}`
      );
      dispatch(get_users());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    //
    // ─── GET USERS ───────────────────────────────────────────────────────
    //
    [get_users.pending]: (state) => {
      state.loadingUsers = true;
    },
    [get_users.fulfilled]: (state, action) => {
      state.users = action.payload.users;
      state.userCount = action.payload.usersCount;
      state.finishedCount = action.payload.finishedCount;
      state.notFinishedCount = action.payload.notFinishedCount;
      state.loadingUsers = false;
    },
    [get_users.rejected]: (state) => {
      state.loadingUsers = false;
    },
    //
    // ─── GET TEACHERS ───────────────────────────────────────────────────────
    //
    [get_teachers.pending]: (state) => {
      state.loadingUsers = true;
    },
    [get_teachers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loadingUsers = false;
    },
    [get_teachers.rejected]: (state) => {
      state.loadingUsers = false;
    },
    //
    // ─── GET USERS ───────────────────────────────────────────────────────
    //
    [get_top_users.pending]: (state) => {
      state.loadingUsers = true;
    },
    [get_top_users.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loadingUsers = false;
    },
    [get_top_users.rejected]: (state) => {
      state.loadingUsers = false;
    },
    //
    // ─── GET USERS ───────────────────────────────────────────────────────
    //
    [get_top_users_all.pending]: (state) => {
      state.loadingUsers = true;
    },
    [get_top_users_all.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loadingUsers = false;
    },
    [get_top_users_all.rejected]: (state) => {
      state.loadingUsers = false;
    },
    //
    // ─── DELETE USER ───────────────────────────────────────────────────────
    //
    [delete_user.pending]: (state) => {
      state.loadingUsers = true;
    },
    [delete_user.fulfilled]: (state) => {
      state.loadingUsers = false;
    },
    [delete_user.rejected]: (state) => {
      state.loadingUsers = false;
    },
  },
});

export default usersSlice.reducer;
