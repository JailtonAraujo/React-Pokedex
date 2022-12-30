import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

const initialState ={
    loading:false,
    success:false,
    error:false,
    message:''
}

export const registerUser = createAsyncThunk("user/register",
async (userToRegister, thunkAPI) =>{

    const data = await authService.registerUser(userToRegister);

    if (data.status === 404 || data.status === 500) {
        return thunkAPI.rejectWithValue(data);
    }
    
    return data;
})

export const login = createAsyncThunk("user/login",
async (userToAuth, thunkAPI) =>{

    const data = await authService.login(userToAuth);

    if (data.status === 404 || data.status === 500) {
        return thunkAPI.rejectWithValue(data);
    }
    
    return data;
})

//functions

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.error = false;
            state.loading = false;
            state.message = '';
        },
    },

    extraReducers: (builder) =>{

        builder

            .addCase(registerUser.pending, (state)=>{
                state.error = false;
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action)=>{
                state.error = false;
                state.loading = false;
                state.message = "success!";
                state.success = true; 
            })
            .addCase(registerUser.rejected, (state,action)=>{
                state.error = true;
                state.loading = false;
                state.message = action.payload.message;
                state.success = false;
            })

            .addCase(login.pending, (state)=>{
                state.error = false;
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action)=>{
                state.error = false;
                state.loading = false;
                state.message = "success!";
                state.success = true; 
            })
            .addCase(login.rejected, (state,action)=>{
                state.error = true;
                state.loading = false;
                state.message = action.payload.message;
                state.success = false;
            })
    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;