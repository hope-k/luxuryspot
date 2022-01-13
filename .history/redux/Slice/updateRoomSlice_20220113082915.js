import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NEXT_URL } from '../../config/config'

export const updateRoom = createAsyncThunk('updateRoom/updateRoom', async ({ updateData, id }) => {
    console.log('============UPDATE DATA', updateData)

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/rooms/${id}`, updateData, config);

        return data
    } catch (err) {
        return err.response.data.message
    }

});




const initialState = {
    success: null,
    error: null,
    loading: false
}

export const updateRoomSlice = createSlice({
    name: 'updateRoom',
    initialState: initialState,
    reducers: {
        clearUpdateRoomError: (state) => {
            state.error = null
        },
        resetUpdateRoom: (state) => {
            state.success = null
        }


    },
    extraReducers: {
        [updateRoom.fulfilled]: (state, action) => {
            state.success = action.payload?.success ? action.payload.success : null
            state.error = action.payload?.error ? action.payload.error : null
            state.loading = false

        },
        [updateRoom.pending]: (state, action) => {
            state.loading = true
        },
        [updateRoom.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false

        },

    }
})
export const { clearUpdateRoomError, resetUpdateRoom } = updateRoomSlice.actions
export default updateRoomSlice.reducer
