import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
  lesson: null,
  lessons: [],
  loadingLesson: true,
  loadingLessons: true,
  errors: null,
  posting: false,
  postingErrors: null,
  posted: true,
  deleting: false,
  creatingVisit: false,
};

// ─── GET LESSONS ──────────────────────────────────────────────────────────────────────
// @GET /api/lessons/c/:id
export const getLessons = createAsyncThunk(
  "lessons/getLessons",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/lessons/c/${courseId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── GET ALL LESSONS ──────────────────────────────────────────────────────────────────────
// @GET /api/lessons/
export const get_all_lessons = createAsyncThunk(
  "lessons/get_all_lessons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/lessons/`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── GET LESSON ──────────────────────────────────────────────────────────────────────
// @GET /api/lessons/:id
export const get_lesson = createAsyncThunk(
  "lessons/get_lesson",
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/lessons/${lessonId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const create_visit = createAsyncThunk(
  "lessons/create_visit",
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/lessons/v/${lessonId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// ─── POST LESSON ──────────────────────────────────────────────────────────────────────
// @POST /api/lessons/:courseId
export const create_lesson = createAsyncThunk(
  "lesson/create_lesson",
  async (
    { title, description, color, quiz, quizType, body, courseId, embededFile },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        title,
        embededFile,
        description,
        color,
        quiz,
        quizType,
        body,
        courseId,
      };
      console.log(data);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/lessons/${courseId}`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── POST LESSON ──────────────────────────────────────────────────────────────────────
// @POST /api/lessons/:courseId
export const update_lesson = createAsyncThunk(
  "lesson/update_lesson",
  async (
    { title, description, color, body, lessonId },
    { rejectWithValue }
  ) => {
    try {
      console.log("===data");
      const data = { title, description, color, body, lessonId };
      console.log(data);
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/lessons/${lessonId}`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── DELETE LESSON ──────────────────────────────────────────────────────────────────────
// @DELETE /api/lesson/:id
export const delete_lesson = createAsyncThunk(
  "courses/delete_lesson",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/lessons/${id}`
      );
      dispatch(get_all_lessons());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    reset(state) {
      state.posted = false;
    },
  },
  extraReducers: {
    //
    // ─── GET ALL LESSONS ───────────────────────────────────────────────────────
    //
    [get_all_lessons.pending]: (state) => {
      state.loadingLessons = true;
    },
    [get_all_lessons.fulfilled]: (state, action) => {
      state.lessons = action.payload;
      state.loadingLessons = false;
    },
    [get_all_lessons.rejected]: (state, action) => {
      state.loadingLessons = false;
    },
    //
    // ─── GET LESSONS ───────────────────────────────────────────────────────
    //
    [getLessons.pending]: (state) => {
      state.loadingLessons = true;
    },
    [getLessons.fulfilled]: (state, action) => {
      state.lessons = action.payload;
      state.loadingLessons = false;
    },
    [getLessons.rejected]: (state, action) => {
      state.loadingLessons = false;
    },
    //
    // ─── GET LESSON ───────────────────────────────────────────────────────
    //
    [get_lesson.pending]: (state) => {
      state.loadingLesson = true;
    },
    [get_lesson.fulfilled]: (state, action) => {
      state.lesson = action.payload;
      state.loadingLesson = false;
    },
    [get_lesson.rejected]: (state, action) => {
      state.loadingLesson = false;
    },
    //
    // ─── CREATE VISIT ───────────────────────────────────────────────────────
    //
    [create_visit.pending]: (state) => {
      state.creatingVisit = true;
    },
    [create_visit.fulfilled]: (state, action) => {
      state.creatingVisit = false;
    },
    [create_visit.rejected]: (state, action) => {
      state.creatingVisit = false;
    },
    //
    // ─── DELETE LESSON ───────────────────────────────────────────────────────
    //
    [delete_lesson.pending]: (state) => {
      state.deleting = true;
    },
    [delete_lesson.fulfilled]: (state, action) => {
      state.deleting = false;
    },
    [delete_lesson.rejected]: (state, action) => {
      state.deleting = false;
    },
    //
    // ─── CREATE LESSON ───────────────────────────────────────────────────────
    //
    [create_lesson.pending]: (state) => {
      state.posting = true;
    },
    [create_lesson.fulfilled]: (state, action) => {
      state.posted = true;
      state.posting = false;
    },
    [create_lesson.rejected]: (state, action) => {
      state.posting = false;
      state.postingErrors = action.payload;
    },
    //
    // ─── UPDATE LESSON ───────────────────────────────────────────────────────
    //
    [update_lesson.pending]: (state) => {
      state.posting = true;
    },
    [update_lesson.fulfilled]: (state, action) => {
      state.posted = true;
      state.posting = false;
    },
    [update_lesson.rejected]: (state, action) => {
      state.posting = false;
      state.postingErrors = action.payload;
    },
  },
});
export const { reset } = lessonsSlice.actions;
export default lessonsSlice.reducer;
