import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NEXT_URL } from '../../config/config';
//thunk action to delete user 



export const deleteUser = createAsyncThunk('deleteUser/deleteUser', async (id) => {

    try {
        const { data } = await axios.delete(`${NEXT_URL}/api/admin/users/${id}`);
        return data;

    } catch (err) {
        return err.message
    }

})




const initialState = {
    loading: false,
    error: null,
    success: null,

}

export const deleteUserSlice = createSlice({
    name: 'deleteUser',
    initialState: initialState,
    reducers: {
        clearDeleteUserError: (state) => {
            state.error = null
        },
        resetDeleteUser: (state) => {
            state.success = null
        },



    },
    extraReducers: {
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false
            state.error = action.payload?.error ? action.payload.error : null
            state.success = action.payload?.success ? action.payload.success : null
        },
        [deleteUser.pending]: (state, action) => {
            state.loading = true
        },
        [deleteUser.rejected]: (state) => {
            state.loading = false
        }



    }
})
export const { clearDeleteUserError, resetDeleteUser } = deleteUserSlice.actions
export default deleteUserSlice.reducer
