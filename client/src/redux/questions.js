import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
  question: null,
  questions: [],
  loadingQuestion: true,
  loadingQuestions: true,
  errors: null,
  posting: false,
  postingErrors: null,
  posted: true,
  deleting: false,
  deleted:false
};

// ─── GET QUESTIONS ──────────────────────────────────────────────────────────────────────
// @GET /api/questions/c/:id
export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/questions/c/${courseId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── GET ALL QUESTIONS ──────────────────────────────────────────────────────────────────────
// @GET /api/questions/
export const get_all_questions = createAsyncThunk(
  "questions/get_all_questions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/questions/`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// ─── GET ALL QUESTIONS ──────────────────────────────────────────────────────────────────────
// @GET /api/questions/
export const get_my_questions = createAsyncThunk(
  "questions/get_all_questions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/questions/me`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// ─── GET QUESTION ──────────────────────────────────────────────────────────────────────
// @GET /api/questions/:id
export const get_question = createAsyncThunk(
  "questions/get_question",
  async (questionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/questions/${questionId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── POST QUESTION ──────────────────────────────────────────────────────────────────────
export const create_question = createAsyncThunk(
  "question/create_question",
  async ({ title,body }, { rejectWithValue }) => {
    try {
      const data = { title, body };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/questions/`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── DELETE QUESTION ──────────────────────────────────────────────────────────────────────
// @DELETE /api/question/:id
export const delete_question = createAsyncThunk(
  "question/delete_question",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/questions/${id}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    reset(state) {
      state.posted = false;
      state.deleted = false
    },
  },
  extraReducers: {
    //
    // ─── GET ALL QUESTIONS ───────────────────────────────────────────────────────
    //
    [get_all_questions.pending]: (state) => {
      state.loadingQuestions = true;
    },
    [get_all_questions.fulfilled]: (state, action) => {
      state.questions = action.payload;
      state.loadingQuestions = false;
    },
    [get_all_questions.rejected]: (state, action) => {
      state.loadingQuestions = false;
    },
    //
    // ─── GET MY  QUESTIONS ───────────────────────────────────────────────────────
    //
    [get_my_questions.pending]: (state) => {
      state.loadingQuestions = true;
    },
    [get_my_questions.fulfilled]: (state, action) => {
      state.questions = action.payload;
      state.loadingQuestions = false;
    },
    [get_my_questions.rejected]: (state, action) => {
      state.loadingQuestions = false;
    },
    //
    // ─── GET QUESTIONS ───────────────────────────────────────────────────────
    //
    [getQuestions.pending]: (state) => {
      state.loadingQuestions = true;
    },
    [getQuestions.fulfilled]: (state, action) => {
      state.questions = action.payload;
      state.loadingQuestions = false;
    },
    [getQuestions.rejected]: (state, action) => {
      state.loadingQuestions = false;
    },
    //
    // ─── GET QUESTION ───────────────────────────────────────────────────────
    //
    [get_question.pending]: (state) => {
      state.loadingQuestion = true;
    },
    [get_question.fulfilled]: (state, action) => {
      state.question = action.payload;
      state.loadingQuestion = false;
    },
    [get_question.rejected]: (state, action) => {
      state.loadingQuestion = false;
    },

    //
    // ─── DELETE QUESTION ───────────────────────────────────────────────────────
    //
    [delete_question.pending]: (state) => {
      state.deleting = true;
    },
    [delete_question.fulfilled]: (state, action) => {
      state.deleting = false;
      state.deleted = true
    },
    [delete_question.rejected]: (state, action) => {
      state.deleting = false;
    },
    //
    // ─── CREATE QUESTION ───────────────────────────────────────────────────────
    //
    [create_question.pending]: (state) => {
      state.posting = true;
    },
    [create_question.fulfilled]: (state, action) => {
      state.posted = true;
      state.posting = false;
    },
    [create_question.rejected]: (state, action) => {
      state.posting = false;
      state.postingErrors = action.payload;
    },
  },
});
export const { reset } = questionsSlice.actions;
export default questionsSlice.reducer;
