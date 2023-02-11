import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signUp, signIn, signOut }       from '../../../util/fetch/Registration & Login';

const initialState = {
    authenticated: false,
    error:         null,
    status:       'idle'
};

export const   sign_up  = createAsyncThunk('auth/sign_up',       async (data) => {
       const/*---------------------*/{ username,email,password,date } = data;
       const   response = await signUp(username,email,password,date);
       return  response;
});

export const   sign_in  = createAsyncThunk('auth/sign_in',  async (data) => {
       const/*---------------------*/{ email, password } = data;
       const   response = await signIn(email, password);
       return  response;
});

export const   sign_out = createAsyncThunk('auth/sign_out', async (data) => {
       const   response = await signOut(data);
       return  response;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    //thunks go here
    extraReducers(builder) {
        builder
        //Sign Up===========================================
        .addCase(sign_up.pending,   (state)         => {
            state.status        = 'loading';
        })
        .addCase(sign_up.fulfilled, (state)         => {
            state.authenticated =  true;
            state.status        = 'succeeded';
        })
        .addCase(sign_up.rejected,  (state, action) => {
            state.error         =  action.error.message;
            state.status        = 'failed';
        })
        //Sign In===========================================
        .addCase(sign_in.pending,   (state)          => {
            state.status        = 'loading';
        })
        .addCase(sign_in.fulfilled, (state)          => {
            state.authenticated =  true;
            state.status        = 'succeeded';
        })
        .addCase(sign_in.rejected,  (state, action)  => {
            state.error         =  action.error.message;
            state.status        = 'failed';
        })
        //Sign Out==========================================
        .addCase(sign_out.pending,   (state)         => {
            state.status        = 'loading';
        })
        .addCase(sign_out.fulfilled, (state)         => {
            state.authenticated =  false;
            state.status        = 'succeeded';
        })
        .addCase(sign_out.rejected,  (state, action) => {
            state.error         =  action.error.message;
            state.status        = 'failed';
        })
    }
});

export default authSlice.reducer;
