import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NEXT_URL } from '../../config/config'

export const createNewReview = createAsyncThunk('newReviews/createNewReview', async (reviewData) => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`${NEXT_URL}/api/reviews`, reviewData, config);
        return data
    } catch (err) {
        return err.response.data.message
    }

});




const initialState = {
    success: null,
    error: null,
    loading: true
}

export const newReviewSlice = createSlice({
    name: 'newReviews',
    initialState: initialState,
    reducers: {
        clearNewReviewsError: (state) => {
            state.error = null
        },
        resetNewReviews: (state) => {
            state.success = false
        }


    },
    extraReducers: {
        [createNewReview.fulfilled]: (state, action) => {
            state.success = action.payload?.success ? action.payload.success : null
            state.error = action.payload?.error ? action.payload.error : null
            state.loading = false

        },        
        [createNewReview.pending]: (state, action) => {
            state.loading = true
        },
        [createNewReview.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false

        },

    }
})
export const { clearNewReviewsError, resetNewReviews } = newReviewSlice.actions
export default newReviewSlice.reducer
