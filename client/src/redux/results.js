import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { get_user_progress, loadUser } from "./auth";
import { getLessons, get_lesson } from "./lessons";
import { checkuser } from "./quiz";
axios.defaults.withCredentials = true;

const initialState = {
  submitting: false,
  submited: false,
};

// ─── POST COURSE ──────────────────────────────────────────────────────────────────────
// @POST /api/results/la/
export const create_result_la = createAsyncThunk(
  "results/create_result_la",
  async ({ score, passed, lessonaId }, { rejectWithValue, dispatch }) => {
    try {
      const data = { score, passed };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/results/la/${lessonaId}`,
        data
      );
      await dispatch(get_user_progress());
      await dispatch(checkuser());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// @POST /api/results/l/
export const create_result_l = createAsyncThunk(
  "results/create_result_l",
  async (
    { score, passed, lessonId, courseId },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const data = { score, passed };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/results/l/${lessonId}`,
        data
      );
      dispatch(getLessons(courseId));
      dispatch(get_lesson(lessonId));
      dispatch(checkuser());

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// @POST /api/results/graduate/
export const graduate = createAsyncThunk("results/graduate", async (_,{rejectWithValue,dispatch}) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/results/graduate`
    );
    dispatch(loadUser());
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});
const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    reset_submited(state) {
      state.submited = false;
    },
  },
  extraReducers: {
    //
    // ─── CREATE RESULT LESSON───────────────────────────────────────────────────────
    //
    [create_result_la.pending]: (state) => {
      state.submitting = true;
    },
    [create_result_la.fulfilled]: (state, action) => {
      state.submited = true;
      state.submitting = false;
    },
    [create_result_la.rejected]: (state, action) => {
      state.submitting = false;
    },
    //
    // ─── CREATE RESULT LESSONA ───────────────────────────────────────────────────────
    //
    [create_result_l.pending]: (state) => {
      state.submitting = true;
    },
    [create_result_l.fulfilled]: (state, action) => {
      state.submited = true;
      state.submitting = false;
    },
    [create_result_l.rejected]: (state, action) => {
      state.submitting = false;
    },

    //
    [graduate.pending]: (state) => {
      state.submitting = true;
    },
    [graduate.fulfilled]: (state, action) => {
      state.submited = true;
      state.submitting = false;
    },
    [graduate.rejected]: (state, action) => {
      state.submitting = false;
    },
  },
});
export const { reset_submited } = resultsSlice.actions;
export default resultsSlice.reducer;
