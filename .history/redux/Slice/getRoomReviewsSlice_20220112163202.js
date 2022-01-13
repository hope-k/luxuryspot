import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NEXT_URL } from '../../config/config'
//thunk action to get all rooms
export const getRoomReviews = createAsyncThunk('allRoomReviews/getRoomReviews', async (id) => {

    try {
        const { data } = await axios.get(`${NEXT_URL}/api/reviews/?id=${id}`);
        return data
    } catch (err) {
        return err.response.data.message
    }

})




const initialState = {
    reviews: [],
    loading: true,
    success: null



}

export const getRoomReviewsSlice = createSlice({
    name: 'allReviews',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [getRoomReviews.fulfilled]: (state, action) => {
            state.reviews = action.payload?.reviews ? action.payload.reviews : []
            state.success = action.payload?.success ? action.payload.success : null
            state.loading = false
            


        },
        [getRoomReviews.pending]: (state, action) => {
            state.loading = true
        },
        [getRoomReviews.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        },

    }
})
export const { clearAdminRoomsError } = getRoomReviewsSlice.actions
export default getRoomReviewsSlice.reducer
