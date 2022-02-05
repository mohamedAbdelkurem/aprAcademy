import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { get_users } from "./users";
axios.defaults.withCredentials = true;

const initialState = {
  certificate: null,
  loadingCertificate: true,
  errors: null,
  posting: false,
  postingErrors: null,
  posted: true,
};

// ─── GET COURSE ──────────────────────────────────────────────────────────────────────
// @GET /api/certificates/c/:id
export const get_certificate = createAsyncThunk(
  "certificates/get_certificate",
  async (certificateId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/certificates/${certificateId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── DELETE CERTIFICATE ──────────────────────────────────────────────────────────────────────
// @DELETE /api/certificate/:id
export const delete_certificate = createAsyncThunk(
  "certificates/delete_certificate",
  async (certificateId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/certificates/${certificateId}`
      );
      dispatch(get_users());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// ─── POST CERTIFICATE ──────────────────────────────────────────────────────────────────────
// @POST /api/certificates/:userId
export const create_certificate = createAsyncThunk(
  "certificates/create_certificate",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/certificates/${userId}`
      );
      dispatch(get_users());

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const certificatesSlice = createSlice({
  name: "certificates",
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
    [get_certificate.pending]: (state) => {
      state.loadingCertificate = true;
    },
    [get_certificate.fulfilled]: (state, action) => {
      state.certificate = action.payload;
      state.loadingCertificate = false;
    },
    [get_certificate.rejected]: (state, action) => {
      state.loadingCertificate = false;
    },
    //
    // ─── CREATE CERRTIFICATE ───────────────────────────────────────────────────────
    //
    [create_certificate.pending]: (state) => {
      state.posting = true;
    },
    [create_certificate.fulfilled]: (state, action) => {
      state.posted = true;
      state.posting = false;
    },
    [create_certificate.rejected]: (state, action) => {
      state.posting = false;
    },
    //
    // ─── DELETE CERRTIFICATE ───────────────────────────────────────────────────────
    //
    [delete_certificate.pending]: (state) => {
      state.deleting = true;
    },
    [delete_certificate.fulfilled]: (state, action) => {
      state.deleting = false;
    },
    [delete_certificate.rejected]: (state, action) => {
      state.deleting = false;
    },
  },
});
export const { reset } = certificatesSlice.actions;
export default certificatesSlice.reducer;
