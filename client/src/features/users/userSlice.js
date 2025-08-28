// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Get user info from localStorage on initial load to persist login state
// const userInfoFromStorage = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null;

// const initialState = {
//   userInfo: userInfoFromStorage,
//   allUsers: { users: [], loading: false, error: null }, // For admin dashboard
//   loading: false,
//   error: null,
// };

// // Helper function to get the auth token from the state
// const getToken = (getState) => {
//   const { user: { userInfo } } = getState();
//   if (!userInfo) return null;
//   return {
//     headers: {
//       Authorization: `Bearer ${userInfo.token}`,
//     },
//   };
// };

// // --- ASYNC THUNKS ---

// export const login = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
//   try {
//     const { data } = await axios.post('/api/users/login', userData);
//     localStorage.setItem('userInfo', JSON.stringify(data));
//     return data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data.message || error.message);
//   }
// });

// export const register = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
//   try {
//     const { data } = await axios.post('/api/users/register', userData);
//     localStorage.setItem('userInfo', JSON.stringify(data));
//     return data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data.message || error.message);
//   }
// });

// export const updateUserProfile = createAsyncThunk('user/updateProfile', async (userData, { getState, rejectWithValue }) => {
//   try {
//     const config = getToken(getState);
//     const { data } = await axios.put('/api/users/profile', userData, config);
//     localStorage.setItem('userInfo', JSON.stringify(data));
//     return data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data.message || error.message);
//   }
// });

// export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async (_, { getState, rejectWithValue }) => {
//   try {
//     const config = getToken(getState);
//     const { data } = await axios.get('/api/users', config);
//     return data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data.message || error.message);
//   }
// });

// export const deleteUser = createAsyncThunk('user/deleteUser', async (id, { getState, rejectWithValue }) => {
//   try {
//     const config = getToken(getState);
//     await axios.delete(`/api/users/${id}`, config);
//     return id;
//   } catch (error) {
//     return rejectWithValue(error.response?.data.message || error.message);
//   }
// });

// // --- SLICE DEFINITION ---

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       localStorage.removeItem('userInfo');
//       state.userInfo = null;
//       state.error = null;
//       state.allUsers = { users: [], loading: false, error: null };
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userInfo = action.payload;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Register
//       .addCase(register.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userInfo = action.payload;
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Update User Profile
//       .addCase(updateUserProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateUserProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userInfo = action.payload;
//       })
//       .addCase(updateUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Fetch All Users (for Admin)
//       .addCase(fetchAllUsers.pending, (state) => {
//         state.allUsers.loading = true;
//       })
//       .addCase(fetchAllUsers.fulfilled, (state, action) => {
//         state.allUsers.loading = false;
//         state.allUsers.users = action.payload;
//       })
//       .addCase(fetchAllUsers.rejected, (state, action) => {
//         state.allUsers.loading = false;
//         state.allUsers.error = action.payload;
//       })
//       // Delete a User (for Admin)
//       .addCase(deleteUser.fulfilled, (state, action) => {
//         state.allUsers.loading = false;
//         state.allUsers.users = state.allUsers.users.filter(
//           (user) => user._id !== action.payload
//         );
//       });
//   },
// });

// export const { logout } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  userInfo: userInfoFromStorage,
  allUsers: { users: [], loading: false, error: null },
  loading: false,
  error: null,
};

const getToken = (getState) => {
  const { user: { userInfo } } = getState();
  return { headers: { Authorization: `Bearer ${userInfo.token}` } };
};

export const login = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/api/users/login', userData);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error) { return rejectWithValue(error.response?.data.message || error.message); }
});

export const register = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/api/users/register', userData);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error) { return rejectWithValue(error.response?.data.message || error.message); }
});

export const updateUserProfile = createAsyncThunk('user/updateProfile', async (userData, { getState, rejectWithValue }) => {
  try {
    const config = getToken(getState);
    const { data } = await axios.put('/api/users/profile', userData, config);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error) { return rejectWithValue(error.response?.data.message || error.message); }
});

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async (_, { getState, rejectWithValue }) => {
  try {
    const config = getToken(getState);
    const { data } = await axios.get('/api/users', config);
    return data;
  } catch (error) { return rejectWithValue(error.response?.data.message || error.message); }
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (id, { getState, rejectWithValue }) => {
  try {
    const config = getToken(getState);
    await axios.delete(`/api/users/${id}`, config);
    return id;
  } catch (error) { return rejectWithValue(error.response?.data.message || error.message); }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo');
      state.userInfo = null;
      state.error = null;
      state.allUsers = { users: [], loading: false, error: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.userInfo = action.payload; })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => { state.loading = false; state.userInfo = action.payload; })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateUserProfile.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateUserProfile.fulfilled, (state, action) => { state.loading = false; state.userInfo = action.payload; })
      .addCase(updateUserProfile.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchAllUsers.pending, (state) => { state.allUsers.loading = true; })
      .addCase(fetchAllUsers.fulfilled, (state, action) => { state.allUsers.loading = false; state.allUsers.users = action.payload; })
      .addCase(fetchAllUsers.rejected, (state, action) => { state.allUsers.loading = false; state.allUsers.error = action.payload; })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.allUsers.loading = false;
        state.allUsers.users = state.allUsers.users.filter((user) => user._id !== action.payload);
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;