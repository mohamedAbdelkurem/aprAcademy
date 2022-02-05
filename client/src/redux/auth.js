import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { checkuser } from "./quiz";
import { get_teachers, get_users } from "./users";
axios.defaults.withCredentials = true;
const initialState = {
  progress: 0,
  loadingProgress: false,
  user: null,
  isAuthenticated: false,
  loading: true,
  errors: null,
  updatingPreferences: false,
};

// ─── LOGIN ──────────────────────────────────────────────────────────────────────
// @POST /api/auth/login
// email : string;
// password : string;
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = {
        email,
        password,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/login`,
        data
      );
      window.location.reload();

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── REGISTER ──────────────────────────────────────────────────────────────────────
// @POST /api/auth/register
// firstname :string;
// lastname :string;
// usernamename :string;
// email : string;
// password : string;
export const register = createAsyncThunk(
  "auth/register",
  async (
    { firstname, lastname, username, email, password },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        firstname,
        lastname,
        username,
        email,
        password,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/register`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//
// ─── ME ─────────────────────────────────────────────────────────────────────────
// @GET /api/auth/me
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/auth/me`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
//
// ─── ME ─────────────────────────────────────────────────────────────────────────
// @GET /api/auth/me
export const get_user_progress = createAsyncThunk(
  "auth/get_user_progress",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/auth/me`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
//
// ─── ME ─────────────────────────────────────────────────────────────────────────
// @GET /api/auth/logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/auth/logout`
      );
      dispatch(loadUser());
      window.location.reload();

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const update_user_preference = createAsyncThunk(
  "auth/update_user_preference",
  async ({ typeScore, levelScore }, { rejectWithValue, dispatch }) => {
    try {
      const data = {
        typeScore,
        levelScore,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/updatepreferences`,
        data
      );
      dispatch(checkuser());
      dispatch(loadUser());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const update_user_grade = createAsyncThunk(
  "auth/update_user_grade",
  async ({ grade, userId }, { rejectWithValue, dispatch }) => {
    try {
      const data = {
        grade,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/updategrade/${userId}`,
        data
      );
      dispatch(get_users());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const update_role_teacher = createAsyncThunk(
  "auth/update_role_teacher",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/updateuserteacher/${userId}`
      );
      dispatch(get_users());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const update_role_normal = createAsyncThunk(
  "auth/update_role_normal",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/updateusernormal/${userId}`
      );
      dispatch(get_teachers());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    //
    // ─── LOGIN ───────────────────────────────────────────────────────
    //
    [login.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.errors = null;
    },
    [login.rejected]: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.errors = action.payload;
    },
    //
    // ─── REGISTER ───────────────────────────────────────────────────────
    //
    [register.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [register.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.errors = null;
    },
    [register.rejected]: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.errors = action.payload;
    },
    //
    // ─── Logout ───────────────────────────────────────────────────────
    //
    //!TODO ADD LOGOUT OVERLAY//
    [logout.fulfilled]: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.progress = 0;
      state.updatingPreferences = null;
    },
    //
    // ─── Me ──---─────────────────────────────────────────────────────
    //
    [loadUser.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [loadUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    [loadUser.rejected]: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },

    //
    // ─── Me ──---─────────────────────────────────────────────────────
    //
    [get_user_progress.pending]: (state, action) => {
      state.loadingProgress = true;
    },
    [get_user_progress.fulfilled]: (state, action) => {
      state.loadingProgress = false;
      state.progress = action.payload.progress;
    },
    [get_user_progress.rejected]: (state) => {
      state.loadingProgress = false;
      state.progress = null;
    },
    //
    // ─── update user preference──---─────────────────────────────────────────────────────
    //
    [update_user_preference.pending]: (state) => {
      state.updatingPreferences = true;
    },
    [update_user_preference.fulfilled]: (state) => {
      state.updatingPreferences = false;
    },
    [update_user_preference.rejected]: (state) => {
      state.updatingPreferences = false;
    },
    //
    // ─── update user grade---─────────────────────────────────────────────────────
    //
    [update_user_grade.pending]: (state) => {
      state.loading = true;
    },
    [update_user_grade.fulfilled]: (state) => {
      state.loading = false;
    },
    [update_user_grade.rejected]: (state) => {
      state.loading = false;
    },
    //
    // ─── make it a teacher---─────────────────────────────────────────────────────
    //
    [update_role_teacher.pending]: (state) => {
      state.loading = true;
    },
    [update_role_teacher.fulfilled]: (state) => {
      state.loading = false;
    },
    [update_role_teacher.rejected]: (state) => {
      state.loading = false;
    },
    //
    // ─── make it a teacher---─────────────────────────────────────────────────────
    //
    [update_role_normal.pending]: (state) => {
      state.loading = true;
    },
    [update_role_normal.fulfilled]: (state) => {
      state.loading = false;
    },
    [update_role_normal.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default authSlice.reducer;
