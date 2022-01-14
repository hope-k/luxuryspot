import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NEXT_URL } from '../../config/config';
//thunk action to get all rooms



export const getMyBookingsDetail = createAsyncThunk('myBookingsDetail/getMyBookingsDetail', async ({id, authCookie}) => {
    const config = {
        headers: {
            cookie: authCookie
        }
    }
    try {
        const { data } = await axios.get(`${origin}/api/bookings/${id}`, config);
        return data

    } catch (err) {
        return err
    }

})




const initialState = {
    myBookingsDetail: [],
    loading: null,
    error: null

}

export const myBookingsDetailSlice = createSlice({
    name: 'myBookingsDetail',
    initialState: initialState,
    reducers: {
        clearMyBookingsDetailError: (state) => {
            state.error = null
        },



    },
    extraReducers: {
        [getMyBookingsDetail.fulfilled]: (state, action) => {
            state.loading = false
            state.error = action.payload?.error ? action.payload.error : null
            state.myBookingsDetail = action.payload?.myBookingsDetail ? action.payload.myBookingsDetail : []
        },
        [getMyBookingsDetail.pending]: (state, action) => {
            state.loading = true
        },
        [getMyBookingsDetail.rejected]: (state) => {
            state.loading = false
        }



    }
})
export const { clearMyBookingsDetailError } = myBookingsDetailSlice.actions
export default myBookingsDetailSlice.reducer
