import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
  introduction: null,
  introductions: [],
  loadingIntroduction: true,
  loadingIntroductions: true,
  errors: null,
  posting: false,
  postingErrors: null,
  posted: true,
  deleting: false,
};

// ─── GET INTRODUCTION ──────────────────────────────────────────────────────────────────────
// @GET /api/introductions/c/:id
export const getIntroductions = createAsyncThunk(
  "introductions/getIntroductions",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/introductions/c/${courseId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── GET ALL INTRODUCTION ──────────────────────────────────────────────────────────────────────
// @GET /api/introductions/
export const get_all_introductions = createAsyncThunk(
  "introductions/get_all_introductions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/introductions/`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── GET VIDEO ──────────────────────────────────────────────────────────────────────
// @GET /api/introductions/:id
export const get_introduction = createAsyncThunk(
  "introductions/get_introduction",
  async (introductionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/introductions/${introductionId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── POST VIDEO ──────────────────────────────────────────────────────────────────────
// @POST /api/introductions/:courseId
export const create_introduction = createAsyncThunk(
  "introduction/create_introduction",
  async ({ courseId, title, body, embededFile }, { rejectWithValue }) => {
    try {
      console.log("===data");
      const data = { title, body, embededFile };
      console.log(data);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/introductions/${courseId}`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── DELETE VIDEO ──────────────────────────────────────────────────────────────────────
// @DELETE /api/introduction/:id
export const delete_introduction = createAsyncThunk(
  "courses/delete_introduction",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/introductions/${id}`
      );
      dispatch(get_all_introductions());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const introductionsSlice = createSlice({
  name: "introductions",
  initialState,
  reducers: {
    reset(state) {
      state.posted = false;
    },
  },
  extraReducers: {
    //
    // ─── GET ALL INTRODUCTION ───────────────────────────────────────────────────────
    //
    [get_all_introductions.pending]: (state) => {
      state.loadingIntroductions = true;
    },
    [get_all_introductions.fulfilled]: (state, action) => {
      state.introductions = action.payload;
      state.loadingIntroductions = false;
    },
    [get_all_introductions.rejected]: (state, action) => {
      state.loadingIntroductions = false;
    },
    //
    // ─── GET INTRODUCTION ───────────────────────────────────────────────────────
    //
    [getIntroductions.pending]: (state) => {
      state.loadingIntroductions = true;
    },
    [getIntroductions.fulfilled]: (state, action) => {
      state.introductions = action.payload;
      state.loadingIntroductions = false;
    },
    [getIntroductions.rejected]: (state, action) => {
      state.loadingIntroductions = false;
    },
    //
    // ─── GET VIDEO ───────────────────────────────────────────────────────
    //
    [get_introduction.pending]: (state) => {
      state.loadingIntroduction = true;
    },
    [get_introduction.fulfilled]: (state, action) => {
      state.introduction = action.payload;
      state.loadingIntroduction = false;
    },
    [get_introduction.rejected]: (state, action) => {
      state.loadingIntroduction = false;
    },

    //
    // ─── DELETE VIDEO ───────────────────────────────────────────────────────
    //
    [delete_introduction.pending]: (state) => {
      state.deleting = true;
    },
    [delete_introduction.fulfilled]: (state, action) => {
      state.deleting = false;
    },
    [delete_introduction.rejected]: (state, action) => {
      state.deleting = false;
    },
    //
    // ─── CREATE VIDEO ───────────────────────────────────────────────────────
    //
    [create_introduction.pending]: (state) => {
      state.posting = true;
    },
    [create_introduction.fulfilled]: (state, action) => {
      state.posted = true;
      state.posting = false;
    },
    [create_introduction.rejected]: (state, action) => {
      state.posting = false;
      state.postingErrors = action.payload;
    },
  },
});
export const { reset } = introductionsSlice.actions;
export default introductionsSlice.reducer;
