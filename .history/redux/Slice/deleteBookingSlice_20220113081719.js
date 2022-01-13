import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NEXT_URL } from '../../config/config';
//thunk action to get all Bookings



export const deleteBooking = createAsyncThunk('deleteBooking/deleteBooking', async (id) => {


    try {


        const { data } = await axios.delete(`/api/admin/bookings/${id}`);
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

export const deleteBookingSlice = createSlice({
    name: 'removeBooking',
    initialState: initialState,
    reducers: {
        clearDeleteBookingError: (state) => {
            state.error = null
        },
        resetDeleteBooking: (state) => {
            state.success = null
        },



    },
    extraReducers: {
        [deleteBooking.fulfilled]: (state, action) => {
            state.loading = false
            state.error = action.payload?.error ? action.payload.error : null
            state.success = action.payload?.success ? action.payload.success : null
        },
        [deleteBooking.pending]: (state, action) => {
            state.loading = true
        },
        [deleteBooking.rejected]: (state) => {
            state.loading = false
        }



    }
})
export const { clearDeleteBookingError, resetDeleteBooking } = deleteBookingSlice.actions
export default deleteBookingSlice.reducer
