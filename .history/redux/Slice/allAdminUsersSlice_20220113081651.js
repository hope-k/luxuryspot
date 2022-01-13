import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NEXT_URL } from '../../config/config'
//thunk action to get all Users
export const getallAdminUsers = createAsyncThunk('allUsers/getAllUsers', async () => {

    try {
        const { data } = await axios.get(`/api/admin/users`);
        return data
    } catch (err) {
        return err.response.data.message
    }

})




const initialState = {
    users: [],
    error: null,
    loading: true,
    



}

export const allAdminUsersSlice = createSlice({
    name: 'allAdminUsers',
    initialState: initialState,
    reducers: {
        clearAdminUsersError: (state) => {
            state.error = null
        },




    },
    extraReducers: {
        [getallAdminUsers.fulfilled]: (state, action) => {
            state.users = action.payload.users
            state.error = action.payload?.error ? action.payload.error : null
            state.loading = false


        },
        [getallAdminUsers.pending]: (state, action) => {
            state.loading = true
        },
        [getallAdminUsers.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        },

    }
})
export const { clearAdminUsersError } = allAdminUsersSlice.actions
export default allAdminUsersSlice.reducer
