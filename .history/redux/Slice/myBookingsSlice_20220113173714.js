import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'a'
//thunk action to get all rooms



export const getMyBookings = createAsyncThunk('myBookings/getMyBookings', async (authCookie) => {

    try {
        const config = {
            headers: {
                cookie: authCookie
            }
        }

        const { data } = await axios.get(`/api/bookings/me`, config);
        return data

    } catch (err) {
        return err
    }

})




const initialState = {
    myBookings: [],
    loading: true,
    error: null

}

export const myBookingsSlice = createSlice({
    name: 'myBookings',
    initialState: initialState,
    reducers: {
        clearMyBookingsError: (state) => {
            state.error = null
        },



    },
    extraReducers: {
        [getMyBookings.fulfilled]: (state, action) => {
            state.loading = false
            state.error = action.payload?.error ? action.payload.error : null
            state.myBookings = action.payload?.myBookings ? action.payload.myBookings : []
        },
        [getMyBookings.pending]: (state, action) => {
            state.loading = true
        },
        [getMyBookings.rejected]: (state) => {
            state.loading = false
        }



    }
})
export const { clearMyBookingsError } = myBookingsSlice.actions
export default myBookingsSlice.reducer