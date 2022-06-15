import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NEXT_URL } from '../../config/config'
//thunk action to get all rooms
export const getallAdminRooms = createAsyncThunk('allRooms/getAllRooms', async () => {

    try {
        const { data } = await axios.get(`/api/admin/rooms`);
        return data
    } catch (err) {
        return err.response.data.message
    }

})




const initialState = {
    rooms: [],
    error: null,
    loading: true



}

export const allAdminRoomsSlice = createSlice({
    name: 'allAdminRooms',
    initialState: initialState,
    reducers: {
        clearAdminRoomsError: (state) => {
            state.error = null
        },




    },
    extraReducers: {
        [getallAdminRooms.fulfilled]: (state, action) => {
            state.rooms = action.payload.rooms
            state.error = action.payload?.error ? action.payload.error : null
            state.loading = false


        },
        [getallAdminRooms.pending]: (state, action) => {
            state.loading = true
        },        
        [getallAdminRooms.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        },

    }
})
export const { clearAdminRoomsError } = allAdminRoomsSlice.actions
export default allAdminRoomsSlice.reducer



