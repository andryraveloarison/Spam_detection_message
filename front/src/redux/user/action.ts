
import { accountService } from "../../services"
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterInterface } from "../../types/UserInterface";


export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }: { email: string; password: string }) => {
      try {
        const response = await accountService.login({ email, password }); 

        return response; 
      } catch (err) {
        throw err;
      }
    }
  );


  export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (payload: Omit<RegisterInterface,'id'>) => {
      try {
        const response = await accountService.register(payload); 

        return response; 
      } catch (err) {
        throw err;
      }
    }
  );



  export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async () => {
      return true
    }
  );