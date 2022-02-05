import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
  posting: false,
  posted: false,
  deleting: false,
  comments: [],
  postingErrors:null,
  loading: false,
};

// ─── DELETE COMMENT ──────────────────────────────────────────────────────────────────────

export const get_comments_l = createAsyncThunk(
  "comments/get_comments_l",
  async (lessonId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/comments/l/${lessonId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const get_comments_la = createAsyncThunk(
  "comments/get_comments_la",
  async (order, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/comments/la/${order}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const get_comments_q = createAsyncThunk(
  "comments/get_comments_q",
  async (questionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/comments/q/${questionId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const delete_comment = createAsyncThunk(
  "comments/delete_comment",
  async (
    { id, lessonType, lessonId, order },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/comments/l/${id}`
      );
      if (lessonType === "A") {
        dispatch(get_comments_la(order));
      } else {
        dispatch(get_comments_l(lessonId));
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const delete_comment_q = createAsyncThunk(
  "comments/delete_comment_q",
  async ({ id, questionId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/comments/q/${id}`
      );

      dispatch(get_comments_q(questionId));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// ─── CREATE COMMENT LESSON B ──────────────────────────────────────────────────────────────────────

export const create_comment_l = createAsyncThunk(
  "comments/create_comment_l",
  async ({ body, lessonId }, { rejectWithValue, dispatch }) => {
    try {
      const data = { body };
      console.log(data);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/comments/l/${lessonId}`,
        data
      );
      dispatch(get_comments_l(lessonId));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── CREATE COMMENT LESSON A ──────────────────────────────────────────────────────────────────────

export const create_comment_la = createAsyncThunk(
  "comments/create_comment_la",
  async ({ body, order }, { rejectWithValue, dispatch }) => {
    try {
      const data = { body };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/comments/la/${order}`,
        data
      );
      dispatch(get_comments_la(order));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const create_comment_q= createAsyncThunk(
  "comments/create_comment_q",
  async ({ body, questionId }, { rejectWithValue, dispatch }) => {
    try {
      const data = { body };
      console.log(data);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/comments/q/${questionId}`,
        data
      );
      dispatch(get_comments_q(questionId));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    // ─── GET COMMENTS LESSONS B ───────────────────────────────────────────────────────
    //
    [get_comments_l.pending]: (state) => {
      state.loading = true;
    },
    [get_comments_l.fulfilled]: (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    },
    [get_comments_l.rejected]: (state, action) => {
      state.loading = false;
    },
    // ─── GET COMMENTS LESSONS A ───────────────────────────────────────────────────────
    //
    [get_comments_la.pending]: (state) => {
      state.loading = true;
    },
    [get_comments_la.fulfilled]: (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    },
    [get_comments_la.rejected]: (state, action) => {
      state.loading = false;
    },
    // ─── GET COMMENTS LESSONS B ───────────────────────────────────────────────────────
    //
    [get_comments_q.pending]: (state) => {
      state.loading = true;
    },
    [get_comments_q.fulfilled]: (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    },
    [get_comments_q.rejected]: (state, action) => {
      state.loading = false;
    },
    // ─── CREATE COMMENT LESSON B ───────────────────────────────────────────────────────
    //
    [create_comment_l.pending]: (state) => {
      state.posting = true;
    },
    [create_comment_l.fulfilled]: (state, action) => {
      state.posted = true;
      state.posting = false;
    },
    [create_comment_l.rejected]: (state, action) => {
      state.posting = false;
      state.postingErrors = action.payload;
    },
    // ─── CREATE COMMENT LESSON A ───────────────────────────────────────────────────────
    //
    [create_comment_la.pending]: (state) => {
      state.posting = true;
    },
    [create_comment_la.fulfilled]: (state, action) => {
      state.posted = true;
      state.posting = false;
    },
    [create_comment_la.rejected]: (state, action) => {
      state.posting = false;
      state.postingErrors = action.payload;
    },
    //
    // ─── DELETE COMMENT ───────────────────────────────────────────────────────
    //
    [delete_comment.pending]: (state) => {
      state.deleting = true;
    },
    [delete_comment.fulfilled]: (state, action) => {
      state.deleting = false;
    },
    [delete_comment.rejected]: (state, action) => {
      state.deleting = false;
    },
  },
});
export const { reset } = commentsSlice.actions;
export default commentsSlice.reducer;
