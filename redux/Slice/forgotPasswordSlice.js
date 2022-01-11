import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NEXT_URL } from '../../config/config';
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}
export const forgotPassword = createAsyncThunk('forgotPassword/forgotPassword', async (userData) => {
    console.group('REDUX EMAIL-------------', userData)
    const { data } = await axios.post(`${NEXT_URL}/api/password/forgot`, userData, config);
    return data;
})




const initialState = {
    loading: false,
    error: null,
    success: null,
}

export const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: initialState,
    reducers: {
        clearForgotPasswordError: (state) => {
            state.error = null
        },
        resetForgotPassword: (state) => {
            state.success = null
        }

    },
    extraReducers: {
        [forgotPassword.fulfilled]: (state, action) => {
            state.loading = false
            state.error = action.payload?.error ? action.payload.error : null
            state.success = action.payload?.message ? action.payload.message : null
        },
        [forgotPassword.pending]: (state, action) => {
            state.loading = true
        },
        [forgotPassword.rejected]: (state) => {
            state.loading = false
        }



    }
})
export const { clearForgotPasswordError, resetForgotPassword } = forgotPasswordSlice.actions
export default forgotPasswordSlice.reducer
