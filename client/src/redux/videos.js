import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
  video: null,
  videos: [],
  loadingVideo: true,
  loadingVideos: true,
  errors: null,
  posting: false,
  postingErrors: null,
  posted: true,
  deleting: false,
};

// ─── GET VIDEOS ──────────────────────────────────────────────────────────────────────
// @GET /api/videos/c/:id
export const getVideos = createAsyncThunk(
  "videos/getVideos",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/videos/c/${courseId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── GET ALL VIDEOS ──────────────────────────────────────────────────────────────────────
// @GET /api/videos/
export const get_all_videos = createAsyncThunk(
  "videos/get_all_videos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/videos/`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── GET VIDEO ──────────────────────────────────────────────────────────────────────
// @GET /api/videos/:id
export const get_video = createAsyncThunk(
  "videos/get_video",
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/videos/${videoId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── POST VIDEO ──────────────────────────────────────────────────────────────────────
// @POST /api/videos/:courseId
export const create_video = createAsyncThunk(
  "video/create_video",
  async ({ courseId, title, duration, link }, { rejectWithValue }) => {
    try {
      const data = { title, duration, link };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/videos/${courseId}`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── DELETE VIDEO ──────────────────────────────────────────────────────────────────────
// @DELETE /api/video/:id
export const delete_video = createAsyncThunk(
  "courses/delete_video",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/videos/${id}`
      );
      dispatch(get_all_videos());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    reset(state) {
      state.posted = false;
    },
  },
  extraReducers: {
    //
    // ─── GET ALL VIDEOS ───────────────────────────────────────────────────────
    //
    [get_all_videos.pending]: (state) => {
      state.loadingVideos = true;
    },
    [get_all_videos.fulfilled]: (state, action) => {
      state.videos = action.payload;
      state.loadingVideos = false;
    },
    [get_all_videos.rejected]: (state, action) => {
      state.loadingVideos = false;
    },
    //
    // ─── GET VIDEOS ───────────────────────────────────────────────────────
    //
    [getVideos.pending]: (state) => {
      state.loadingVideos = true;
    },
    [getVideos.fulfilled]: (state, action) => {
      state.videos = action.payload;
      state.loadingVideos = false;
    },
    [getVideos.rejected]: (state, action) => {
      state.loadingVideos = false;
    },
    //
    // ─── GET VIDEO ───────────────────────────────────────────────────────
    //
    [get_video.pending]: (state) => {
      state.loadingVideo = true;
    },
    [get_video.fulfilled]: (state, action) => {
      state.video = action.payload;
      state.loadingVideo = false;
    },
    [get_video.rejected]: (state, action) => {
      state.loadingVideo = false;
    },

    //
    // ─── DELETE VIDEO ───────────────────────────────────────────────────────
    //
    [delete_video.pending]: (state) => {
      state.deleting = true;
    },
    [delete_video.fulfilled]: (state, action) => {
      state.deleting = false;
    },
    [delete_video.rejected]: (state, action) => {
      state.deleting = false;
    },
    //
    // ─── CREATE VIDEO ───────────────────────────────────────────────────────
    //
    [create_video.pending]: (state) => {
      state.posting = true;
    },
    [create_video.fulfilled]: (state, action) => {
      state.posted = true;
      state.posting = false;
    },
    [create_video.rejected]: (state, action) => {
      state.posting = false;
      state.postingErrors = action.payload;
    },
  },
});
export const { reset } = videosSlice.actions;
export default videosSlice.reducer;
