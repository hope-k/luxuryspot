import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NEXT_URL } from '../../config/config'
//thunk action to get all rooms
//Next url is localhost:3000 || the env host process.env.NEXT_PUBLIC_URL
export const registerUser = createAsyncThunk('user/registerUser', async (userData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(/api/auth/register, userData, config);
        console.log('===========================', data )
        return data
        

 
    } catch (err) {
        return err.message
    }

})




const initialState = {
    loading: false,
    user: null,
    error: null,
    success: null
}

export const registerUserSlice = createSlice({
    name: 'registerUser',
    initialState: initialState,
    reducers: {
        clearRegisterUserError: (state) => {
            state.error = null
        },
        resetRegister: (state) => {
            state.success = null
        }
    },
    extraReducers: {
        [registerUser.fulfilled]: (state,action) => {
            state.loading = false
            state.error = action.payload?.error ? action.payload.error : null
            state.success = action.payload?.message ? action.payload.message : null
            
        },
        [registerUser.pending]: (state, action) => {
            state.loading = true
        },
        [registerUser.rejected]: (state, action) => {
            state.loading = false
        }

    }
})
export const { clearRegisterUserError, resetRegister } = registerUserSlice.actions
export default registerUserSlice.reducer
