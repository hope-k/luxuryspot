import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'
//thunk action to get all rooms
export const getallRooms = createAsyncThunk('allRooms/getAllRooms', async ({ req, pageNo = 1, location = '', guests, category }, { rejectWithValue }) => {

    try {
        const { origin } = absoluteUrl(req) // using next absolute url and passing req from getServerSideProps to get "http://localhost:3000"
        let link = `${origin}/api/rooms?page=${pageNo}&location=${location}`
        if (guests) link = link.concat(`&guestCapacity=${guests}`)
        if (category) link = link.concat(`&category=${category}`)


        const { data } = await axios.get(link);

        return data
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }

})




const initialState = {
    rooms: [],
    roomCount: null,
    resPerPage: null,
    filteredRoomCount: null,
    error: null


}

export const allRoomsSlice = createSlice({
    name: 'allRooms',
    initialState: initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },



    },
    extraReducers: {
        [getallRooms.fulfilled]: (state, action) => {
            state.rooms = action.payload.rooms
            state.roomCount = action.payload.roomCount
            state.resPerPage = action.payload.resPerPage
            state.filteredRoomCount = action.payload.filteredRoomCount

        },
        [getallRooms.rejected]: (state, action) => {
            state.error = action.payload
        },

    }
})
export const { clearError } = allRoomsSlice.actions
export default allRoomsSlice.reducer
