import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'
//thunk action to get all rooms
export const getRoom = createAsyncThunk('room/getRoom', async ({ id, req }, { rejectWithValue }) => {
    try {
        const { origin } = absoluteUrl(req) // using next absolute url and passing req from getServerSideProps to get "http://localhost:3000"
        const { data } = await axios.get(`${origin}/api/rooms/${id}`);
        return data
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }

})




const initialState = {
    room: {},
    error: null,
    loading: false,

}

export const roomSlice = createSlice({
    name: 'room',
    initialState: initialState,
    reducers: {
        clearRoomError: (state) => {
            state.error = null
        }


    },
    extraReducers: {
        [getRoom.fulfilled]: (state, action) => {
            state.room = action.payload?.room && action.payload.room
            state.error = action.payload?.error ? action.payload.error : null
            state.loading = false
        },
        [getRoom.pending]: (state, action) => {
            state.loading = true
        },
        [getRoom.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false

        },

    }
})
export const { clearRoomError } = roomSlice.actions
export default roomSlice.reducer
