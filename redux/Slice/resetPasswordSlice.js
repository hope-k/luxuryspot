import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NEXT_URL } from '../../config/config';
//thunk action to get all rooms
//Next url is localhost:3000 || the env host process.env.NEXT_PUBLIC_URL
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}
export const resetPassword = createAsyncThunk('reset/resetPassword', async (resetPasswordObj) => {
    const { token } = resetPasswordObj
    const { passwords } = resetPasswordObj
    console.log('REDUX DATA', resetPasswordObj)
    const { data } = await axios.put(`${NEXT_URL}/api/password/reset/${token}`, passwords, config);
    return data;
})




const initialState = {
    loading: false,
    error: null,
    success: null,
}

export const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState: initialState,
    reducers: {
        clearResetPasswordError: (state) => {
            state.error = null
        },
        clearResetSuccess: (state) => {
            state.success = null
        }
    },
    extraReducers: {
        [resetPassword.fulfilled]: (state, action) => {
            state.loading = false
            state.error = action.payload?.error ? action.payload.error : null
            state.success = action.payload?.message ? action.payload.message : null
        },
        [resetPassword.pending]: (state, action) => {
            state.loading = true
        },
        [resetPassword.rejected]: (state) => {
            state.loading = false
        }



    }
})
export const { clearResetPasswordError, clearResetSuccess } = resetPasswordSlice.actions
export default resetPasswordSlice.reducer
