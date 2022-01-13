import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NEXT_URL } from '../../config/config';

//thunk action to get all Reviews



export const deleteReview = createAsyncThunk('deleteReview/deleteReview', async ({id, roomId}) => {
    try {
        const { data } = await axios.delete(`/api/reviews/?id=${id}&roomId=${roomId}`);
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

export const deleteReviewSlice = createSlice({
    name: 'removeReview',
    initialState: initialState,
    reducers: {
        clearDeleteReviewError: (state) => {
            state.error = null
        },
        resetDeleteReview: (state) => {
            state.success = null
        },



    },
    extraReducers: {
        [deleteReview.fulfilled]: (state, action) => {
            state.loading = false
            state.error = action.payload?.error ? action.payload.error : null
            state.success = action.payload?.success ? action.payload.success : null
        },
        [deleteReview.pending]: (state, action) => {
            state.loading = true
        },
        [deleteReview.rejected]: (state) => {
            state.loading = false
        }


    }
})
export const { clearDeleteReviewError, resetDeleteReview } = deleteReviewSlice.actions
export default deleteReviewSlice.reducer
