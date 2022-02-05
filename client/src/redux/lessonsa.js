import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
  lessona: null,
  lessonsa: [],
  loadingLessona: true,
  loadingLessonsa: true,
  errors: null,
  posting: false,
  postingErrors: null,
  posted: true,
  deleting: false,
};

// ─── GET LESSONS ──────────────────────────────────────────────────────────────────────
// @GET /api/lessonsa/c/:id
export const getLessonsa = createAsyncThunk(
  "lessons/getLessonsa",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/lessonsa/c/${courseId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── GET ALL LESSONS ──────────────────────────────────────────────────────────────────────
// @GET /api/lessons/
export const get_all_lessonsa = createAsyncThunk(
  "lessonsa/get_all_lessonsa",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/lessonsa/`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── GET LESSON ──────────────────────────────────────────────────────────────────────
// @GET /api/lessons/:id
export const get_lessona = createAsyncThunk(
  "lessonsa/get_lessona",
  async ({courseId,order}, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/lessonsa/l/${courseId}/${order}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── POST LESSON ──────────────────────────────────────────────────────────────────────
// @POST /api/lessonsa/:courseId
export const create_lessona = createAsyncThunk(
  "lesson/create_lessona",
  async (
    {
      title,
      description,
      color,
      quiz,
      quizType,
      body,
      courseId,
      embededFile,
      order,
    },
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
        order,
      };
      console.log(data);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/lessonsa/${courseId}`,
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
export const delete_lessona = createAsyncThunk(
  "courses/delete_lessona",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/lessonsa/${id}`
      );
      dispatch(get_all_lessonsa());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const lessonsaSlice = createSlice({
  name: "lessonsa",
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
    [get_all_lessonsa.pending]: (state) => {
      state.loadingLessonsa = true;
    },
    [get_all_lessonsa.fulfilled]: (state, action) => {
      state.lessonsa = action.payload;
      state.loadingLessons = false;
    },
    [get_all_lessonsa.rejected]: (state, action) => {
      state.loadingLessonsa = false;
    },
    //
    // ─── GET LESSONS ───────────────────────────────────────────────────────
    //
    [getLessonsa.pending]: (state) => {
      state.loadingLessonsa = true;
    },
    [getLessonsa.fulfilled]: (state, action) => {
      state.lessonsa = action.payload;
      state.loadingLessonsa = false;
    },
    [getLessonsa.rejected]: (state, action) => {
      state.loadingLessonsa = false;
    },
    //
    // ─── GET LESSONA ───────────────────────────────────────────────────────
    //
    [get_lessona.pending]: (state) => {
      state.loadingLessona = true;
    },
    [get_lessona.fulfilled]: (state, action) => {
      state.lessona = action.payload;
      state.loadingLessona = false;
    },
    [get_lessona.rejected]: (state, action) => {
      state.loadingLessona = false;
    },

    //
    // ─── DELETE LESSONA ───────────────────────────────────────────────────────
    //
    [delete_lessona.pending]: (state) => {
      state.deleting = true;
    },
    [delete_lessona.fulfilled]: (state, action) => {
      state.deleting = false;
    },
    [delete_lessona.rejected]: (state, action) => {
      state.deleting = false;
    },
    //
    // ─── CREATE LESSONA ───────────────────────────────────────────────────────
    //
    [create_lessona.pending]: (state) => {
      state.posting = true;
    },
    [create_lessona.fulfilled]: (state, action) => {
      state.posted = true;
      state.posting = false;
    },
    [create_lessona.rejected]: (state, action) => {
      state.posting = false;
      state.postingErrors = action.payload;
    },
   
  },
});
export const { reset } = lessonsaSlice.actions;
export default lessonsaSlice.reducer;
