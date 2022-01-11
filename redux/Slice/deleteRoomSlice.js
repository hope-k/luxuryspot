import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NEXT_URL } from '../../config/config';
//thunk action to get all rooms



export const deleteRoom = createAsyncThunk('deleteRoom/deleteRoom', async (id) => {

    try {
      

        const { data } = await axios.delete(`${NEXT_URL}/api/rooms/${id}`);
        return data

    } catch (err) {
        return err.message
    }

})




const initialState = {
    loading: false,
    error: null,
    success: null,

}

export const deleteRoomSlice = createSlice({
    name: 'removeRoom',
    initialState: initialState,
    reducers: {
        clearDeleteRoomError: (state) => {
            state.error = null
        },        
        resetDeleteRoom: (state) => {
            state.success = null
        },



    },
    extraReducers: {
        [deleteRoom.fulfilled]: (state, action) => {
            state.loading = false
            state.error = action.payload?.error ? action.payload.error : null
            state.success = action.payload?.success ? action.payload.success : null
        },
        [deleteRoom.pending]: (state, action) => {
            state.loading = true
        },
        [deleteRoom.rejected]: (state) => {
            state.loading = false
        }



    }
})
export const { clearDeleteRoomError, resetDeleteRoom } = deleteRoomSlice.actions
export default deleteRoomSlice.reducer
