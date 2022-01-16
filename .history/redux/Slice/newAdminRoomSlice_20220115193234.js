import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NEXT_URL } from '../../config/config'

export const createAdminRoom = createAsyncThunk('room/getRoom', async (roomData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/rooms/newRooms`, roomData, config);

        return data
    } catch (err) {
        return (err.response.data.message)
    }

})




const initialState = {
    loading: false,
    success: false,
    error: null
}

export const newAdminRoomSlice = createSlice({
    name: 'newAdminRoom',
    initialState: initialState,
    reducers: {
        clearNewAdminRoomError: (state) => {
            state.error = null
        },       
        resetNewAdminRoom: (state) => {
            state.success = false
        }


    },
    extraReducers: {
        [createAdminRoom.fulfilled]: (state, action) => {
            state.loading = false
            state.success = action.payload?.success ? action.payload.success : null
            state.error = action.payload?.error ? action.payload.error : null
        },
        [createAdminRoom.pending]: (state, action) => {
            state.loading = true
        },        
        [createAdminRoom.rejected]: (state, action) => {
            state.loading = false
        },

    }
})
export const { resetNewAdminRoom, clearNewAdminRoomError } = newAdminRoomSlice.actions
export default newAdminRoomSlice.reducer
