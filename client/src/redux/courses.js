import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
  course: null,
  courses: [],
  loadingCourse: true,
  loadingCourses: true,
  errors: null,
  posting: false,
  postingErrors: null,
  posted: true,
};

// ─── GET COURSES ──────────────────────────────────────────────────────────────────────
// @GET /api/courses
export const get_courses = createAsyncThunk(
  "courses/get_courses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/courses`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// ─── GET COURSE ──────────────────────────────────────────────────────────────────────
// @GET /api/courses/c/:id
export const get_course = createAsyncThunk(
  "courses/get_course",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/courses/c/${courseId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const get_courses_match = createAsyncThunk(
  "courses/get_courses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/courses/match`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// ─── DELETE COURSE ──────────────────────────────────────────────────────────────────────
// @DELETE /api/course/:id
export const delete_course = createAsyncThunk(
  "courses/delete_course",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/courses/${id}`
      );
      dispatch(get_courses());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// ─── POST COURSE ──────────────────────────────────────────────────────────────────────
// @POST /api/courses
export const create_course = createAsyncThunk(
  "courses/create_course",
  async ({ title, level, type, description }, { rejectWithValue }) => {
    try {
      const data = { title, level, type, description };
      console.log(data);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/courses/`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    reset(state) {
      state.posted = false;
    },
  },
  extraReducers: {
    //
    // ─── GET COURSES ───────────────────────────────────────────────────────
    //
    [get_courses.pending]: (state) => {
      state.loadingCourses = true;
    },
    [get_courses.fulfilled]: (state, action) => {
      state.courses = action.payload;
      state.loadingCourses = false;
    },
    [get_courses.rejected]: (state, action) => {
      state.loadingCourses = false;
    },
     //
    // ─── GET COURSES ───────────────────────────────────────────────────────
    //
    [get_course.pending]: (state) => {
      state.loadingCourse = true;
    },
    [get_course.fulfilled]: (state, action) => {
      state.course = action.payload;
      state.loadingCourse = false;
    },
    [get_course.rejected]: (state, action) => {
      state.loadingCourse = false;
    },
    //
    // ─── GET COURSES  MATCH─────────────────────────────────────────────────────
    //
    [get_courses_match.pending]: (state) => {
      state.loadingCourses = true;
    },
    [get_courses_match.fulfilled]: (state, action) => {
      state.courses = action.payload;
      state.loadingCourses = false;
    },
    [get_courses_match.rejected]: (state, action) => {
      state.loadingCourses = false;
    },
    //
    // ─── CREATE COURSE ───────────────────────────────────────────────────────
    //
    [create_course.pending]: (state) => {
      state.posting = true;
    },
    [create_course.fulfilled]: (state, action) => {
      state.posted = true;
      state.posting = false;
    },
    [create_course.rejected]: (state, action) => {
      state.posting = false;
      state.postingErrors = action.payload;
    },
    //
    // ─── DELETE COURSE ───────────────────────────────────────────────────────
    //
    [delete_course.pending]: (state) => {
      state.deleting = true;
    },
    [delete_course.fulfilled]: (state, action) => {
      state.deleting = false;
    },
    [delete_course.rejected]: (state, action) => {
      state.deleting = false;
    },
  },
});
export const { reset } = coursesSlice.actions;
export default coursesSlice.reducer;
