import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signUp, signIn, signOut, isAuth }       from '../../../util/fetch/Registration & Login';

const initialState = {
    authenticated: false,
    user_id:       null,
    user_name:    "Guest",
    email:         null,
    password:      null,
    date_of_birth: null,
    credit:        0,
    error:         null,
    status:       'idle'
};

export const  sign_up  = createAsyncThunk('auth/sign_up',       async (data) => {
       const/*--------------------*/{ username,email,password,date } = data;
       const  response = await signUp(username,email,password,date);
       return response;
});

export const  sign_in  = createAsyncThunk('auth/sign_in',  async (data) => {
       const/*--------------------*/{ email, password } = data;
       const  response = await signIn(email, password);
       return response;
});

export const  sign_out = createAsyncThunk('auth/sign_out', async (user) => {
       const  response = await signOut(user);
       return response;
});

export const  is_Auth  = createAsyncThunk('auth/is_Auth',  async ()     => {
       const  response = await isAuth();
       return response
})

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
        .addCase(sign_up.fulfilled, (state, action)  => {
            const {user_id,user_name,email,password,date_of_birth,credit} = action.payload
            state.authenticated = true;
            state.user_id       = user_id;
            state.user_name     = user_name;
            state.email         = email;
            state.password      = password;
            state.date_of_birth = date_of_birth;
            state.credit        = credit;
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
        .addCase(sign_in.fulfilled, (state, action)  => {
            const {user_id,user_name,email,password,date_of_birth,credit} = action.payload;
            state.authenticated = true;
            state.user_id       = user_id;
            state.user_name     = user_name;
            state.email         = email;
            state.password      = password;
            state.date_of_birth = date_of_birth;
            state.credit        = credit;
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
            state.user_id       =  null;
            state.user_name     = "Guest";
            state.email         =  null;
            state.password      =  null;
            state.date_of_birth =  null;
            state.credit        =  0;
            state.status        = 'succeeded';
        })
        .addCase(sign_out.rejected,  (state, action) => {
            state.error         =  action.error.message;
            state.status        = 'failed';
            console.log(action.error.message)
        })
        //Is Auth============================================
        .addCase(is_Auth.pending,   (state)         => {
            state.status        = 'loading';
        })
        .addCase(is_Auth.fulfilled, (state, action) => {
            console.log(action.payload);
            const {user_id,user_name,email,password,date_of_birth,credit} = action.payload;
            state.authenticated = true;
            state.user_id       = user_id;
            state.user_name     = user_name;
            state.email         = email;
            state.password      = password;
            state.date_of_birth = date_of_birth;
            state.credit        = credit;
            state.status        = 'succeeded';
        })
        .addCase(is_Auth.rejected,  (state, action) => {
            state.error         =  action.error.message;
            state.status        = 'failed';
        })
    }
});

export default authSlice.reducer;
