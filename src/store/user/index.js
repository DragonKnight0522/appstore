import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Fetch Users
export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async () => {
  // const response = await axios.get('/user')

  // return response.data
  return {
    personalInfo: {
      firstName: 'first_name',
      middleName: 'middle_name',
      lastName: 'last_name',
      displayName: 'display_name',
      userHandle: '@user_handle',
    },
    organization: { department: "System", role: "System Administrator" },
    user: {
      email: "user@mail.com",
      password: "asdasdasdA!1",
      authenticator: false,
    },
    sessions: [
      { created: "02/08/2024, 11:52:27", ip_address: "87.255.255.255", email: "user@mail.com", active: false },
      { created: "02/08/2024, 11:52:27", ip_address: "87.255.255.255", email: "user@mail.com", active: true },
    ],
    preferences: {
      language: "Greek",
      measurements: "Metric",
      timezone: "Europe/Sofia",
    }
  }
})

// ** Update User Information **
export const updateUserInfo = createAsyncThunk('user/updateUserInfo', async (data, { getState, dispatch }) => {
  // const response = await axios.post(`/user/${data.id}`, { data })
  dispatch(handleUserInfoUpdate(data))
})

// ** Update User Session **
export const updateUserSession = createAsyncThunk('user/updateUserInfo', async (data, { getState, dispatch }) => {
  // const response = await axios.get(`/session/${data.id}`)
  // dispatch(handleUserSessionUpdate(data))
})

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    personalInfo: {},
    organization: {},
    user: {},
    sessions: [],
    preferences: {}
  },
  reducers: {
    handleUserInfoUpdate: (state, action) => {
      state[action.payload.field] = { ...state[action.payload.field], ...action.payload.data };
    },
    handleUserSessionUpdate: (state, action) => {
      state.sessions = action.payload.data;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.personalInfo = action.payload.personalInfo
      state.organization = action.payload.organization
      state.user = action.payload.user
      state.authenticator = action.payload.authenticator
      state.sessions = action.payload.sessions
      state.preferences = action.payload.preferences
    })
  }
})

export const { handleUserInfoUpdate } = userSlice.actions

export default userSlice.reducer
