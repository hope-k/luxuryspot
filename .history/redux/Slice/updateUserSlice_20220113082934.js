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
export const updateUser = createAsyncThunk('updateUser/getUpdateUser', async (updateUserObj) => {
    const { data } = await axios.put(`/api/me/update`, updateUserObj, config);
    return data;
})




const initialState = {
    loading: false,
    error: null,
    success: null,
}

export const updateUserSlice = createSlice({
    name: 'updateUser',
    initialState: initialState,
    reducers: {
        clearUpdateUserError: (state) => {
            state.error = null
        },
        resetUpdateUser: (state) => {
            state.success = null
        }
    },
    extraReducers: {
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false
            state.error = action.payload?.error ? action.payload.error : null
            state.success = action.payload?.message ? action.payload.message : null
        },
        [updateUser.pending]: (state, action) => {
            state.loading = true
        },
        [updateUser.rejected]: (state) => {
            state.loading = false
        }



    }
})
export const { clearUpdateUserError, resetUpdateUser } = updateUserSlice.actions
export default updateUserSlice.reducer
