
import {  createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, registerUser } from './action';
import { UserState } from './type';

const initialState: UserState = {
  status: 'idle',
  error: null,
  user: null,
  token: ""
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    //Login
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.data.person
      state.token = action.payload.data.token
      state.status = 'succeeded';
      
    });

    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      alert("email ou mot de passe invalide")
      state.status = 'failed';
      state.error = action.error.message || 'An error occurred';
    });

    //LOGOUT
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.token = ""
      state.user = null
      state.error= null
      state.status = 'succeeded';
      
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(logoutUser.rejected, (state, action) => {
      alert("Erreur pendant la deconnexion")
      state.status = 'failed';
      state.error = action.error.message || 'An error occurred';
    });

    //REGISTER
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.token = ""
      state.user = null
      state.error= null
      state.status = 'succeeded';
      
    });

    builder.addCase(registerUser.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      alert("Ce compte existe deja")
      state.status = 'failed';
      state.error = action.error.message || 'An error occurred';
    });
  },
  
});

export default userSlice.reducer;