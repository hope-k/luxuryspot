import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NEXT_URL } from '../../config/config';
//thunk action to get all rooms



export const getBookedDates = createAsyncThunk('bookedDates/getBookedDates', async ( id , { rejectWithValue }) => {

    try {

        const { data } = await axios.get(`${NEXT_URL}/api/bookings/getBookedDates/?roomId=${id}`);
        return data

    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }

})




const initialState = {
    bookedDates: [],
    loading: null,
    error: null

}

export const bookedDatesSlice = createSlice({
    name: 'bookedDates',
    initialState: initialState,
    reducers: {
        clearBookedDatesError: (state) => {
            state.error = null
        },




    },
    extraReducers: {
        [getBookedDates.fulfilled]: (state, action) => {
            state.loading = false
            state.error = action.payload?.error ? action.payload.error : null
            state.bookedDates = action.payload?.bookedDates ? action.payload.bookedDates : []
        },
        [getBookedDates.pending]: (state, action) => {
            state.loading = true
        },
        [getBookedDates.rejected]: (state) => {
            state.loading = false
        }



    }
})
export const { clearBookedDatesError, resetBookedDates } = bookedDatesSlice.actions
export default bookedDatesSlice.reducer
