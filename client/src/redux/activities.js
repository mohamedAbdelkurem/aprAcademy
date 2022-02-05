import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
  activity: null,
  activities: [],
  loadingActivitie: true,
  loadingActivities: true,
  errors: null,
  posting: false,
  postingErrors: null,
  posted: true,
  deleting: false,
};

// ─── GET ACTIVITYS ──────────────────────────────────────────────────────────────────────
// @GET /api/activities/c/:id
export const getActivities = createAsyncThunk(
  "activities/getActivities",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/activities/c/${courseId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── GET ALL ACTIVITYS ──────────────────────────────────────────────────────────────────────
// @GET /api/activities/
export const get_all_activities = createAsyncThunk(
  "activities/get_all_activities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/activities/`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── GET ACTIVITY ──────────────────────────────────────────────────────────────────────
// @GET /api/activities/:id
export const get_activity = createAsyncThunk(
  "activities/get_activity",
  async (activityId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/activities/${activityId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── POST ACTIVITY ──────────────────────────────────────────────────────────────────────
// @POST /api/activities/:courseId
export const create_activity = createAsyncThunk(
  "activity/create_activity",
  async ({ title, courseId, body }, { rejectWithValue }) => {
    try {
      console.log("===data");
      const data = { title, courseId, body };
      console.log(data);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/activities/${courseId}`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── DELETE ACTIVITY ──────────────────────────────────────────────────────────────────────
// @DELETE /api/activity/:id
export const delete_activity = createAsyncThunk(
  "courses/delete_activity",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/activities/${id}`
      );
      dispatch(get_all_activities());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    reset(state) {
      state.posted = false;
    },
  },
  extraReducers: {
    //
    // ─── GET ALL ACTIVITIES ───────────────────────────────────────────────────────
    //
    [get_all_activities.pending]: (state) => {
      state.loadingActivities = true;
    },
    [get_all_activities.fulfilled]: (state, action) => {
      state.activities = action.payload;
      state.loadingActivities = false;
    },
    [get_all_activities.rejected]: (state, action) => {
      state.loadingActivities = false;
    },
    //
    // ─── GET ACTIVITIES ───────────────────────────────────────────────────────
    //
    [getActivities.pending]: (state) => {
      state.loadingActivities = true;
    },
    [getActivities.fulfilled]: (state, action) => {
      state.activities = action.payload;
      state.loadingActivities = false;
    },
    [getActivities.rejected]: (state, action) => {
      state.loadingActivities = false;
    },
    //
    // ─── GET ACTIVITY ───────────────────────────────────────────────────────
    //
    [get_activity.pending]: (state) => {
      state.loadingActivitie = true;
    },
    [get_activity.fulfilled]: (state, action) => {
      state.activity = action.payload;
      state.loadingActivitie = false;
    },
    [get_activity.rejected]: (state, action) => {
      state.loadingActivitie = false;
    },

    //
    // ─── DELETE ACTIVITY ───────────────────────────────────────────────────────
    //
    [delete_activity.pending]: (state) => {
      state.deleting = true;
    },
    [delete_activity.fulfilled]: (state, action) => {
      state.deleting = false;
    },
    [delete_activity.rejected]: (state, action) => {
      state.deleting = false;
    },
    //
    // ─── CREATE ACTIVITY ───────────────────────────────────────────────────────
    //
    [create_activity.pending]: (state) => {
      state.posting = true;
    },
    [create_activity.fulfilled]: (state, action) => {
      state.posted = true;
      state.posting = false;
    },
    [create_activity.rejected]: (state, action) => {
      state.posting = false;
      state.postingErrors = action.payload;
    },
  },
});
export const { reset } = activitiesSlice.actions;
export default activitiesSlice.reducer;
