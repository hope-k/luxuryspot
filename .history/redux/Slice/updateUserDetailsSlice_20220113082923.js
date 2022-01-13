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
export const updateUserDetails = createAsyncThunk('updateUserDetails/updateUserDetailsSlice', async ({id, role}) => {
    console.log('=========ID', role)
    const { data } = await axios.put(`/api/admin/users/${id}`, role, config);
    return data;
})




const initialState = {
    loading: false,
    error: null,
    success: null,
}

export const updateUserDetailsSlice = createSlice({
    name: 'updateUserDetails',
    initialState: initialState,
    reducers: {
        clearUpdateUserDetailsError: (state) => {
            state.error = null
        },
        resetUpdateUserDetails: (state) => {
            state.success = null
        }
    },
    extraReducers: {
        [updateUserDetails.fulfilled]: (state, action) => {
            state.loading = false
            state.error = action.payload?.error ? action.payload.error : null
            state.success = action.payload?.success ? action.payload.success : false
        },
        [updateUserDetails.pending]: (state, action) => {
            state.loading = true
        },
        [updateUserDetails.rejected]: (state) => {
            state.loading = false
        }



    }
})
export const { clearUpdateUserDetailsError, resetUpdateUserDetails } = updateUserDetailsSlice.actions
export default updateUserDetailsSlice.reducer
