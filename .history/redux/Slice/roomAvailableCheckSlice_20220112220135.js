import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NEXT_URL } from '../../config/config';
//thunk action to get all rooms
export const checkAvailability = createAsyncThunk('checkAvailability/roomAvailabilitySlice', async ({ id, checkInDate, checkOutDate }, { rejectWithValue }) => {
    try {

        const { data } = await axios.get(`/api/bookings/checkAvailability/?roomId=${id}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`);

        return data

    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }

})




const initialState = {
    isAvailable: null,
    loading: null,
    error: null

}

export const roomAvailabilitySlice = createSlice({
    name: 'checkAvailability',
    initialState: initialState,
    reducers: {
        clearCheckAvailabilityError: (state) => {
            state.error = null
        },
        resetIsAvailable: (state) => {
            state.isAvailable = null
        }



    },
    extraReducers: {
        [checkAvailability.fulfilled]: (state, action) => {
            state.loading = false
            state.error = action.payload?.error ? action.payload.error : null
            state.isAvailable = action.payload?.isAvailable ? action.payload.isAvailable : null
        },
        [checkAvailability.pending]: (state, action) => {
            state.loading = true
        },
        [checkAvailability.rejected]: (state) => {
            state.loading = false
        }



    }
})
export const { clearCheckAvailabilityError, resetIsAvailable } = roomAvailabilitySlice.actions
export default roomAvailabilitySlice.reducer
