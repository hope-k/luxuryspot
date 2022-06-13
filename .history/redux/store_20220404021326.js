import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import allRoomsSlice from './Slice/allRoomsSlice'
import roomSlice from './Slice/roomSlice';
import registerUserSlice from './Slice/registerUserSlice';
import { combineReducers, pro } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import userSlice from './Slice/userSlice';
import updateUserSlice from './Slice/updateUserSlice';
import forgotPasswordSlice from './Slice/forgotPasswordSlice';
import  resetPasswordSlice  from './Slice/resetPasswordSlice';
import roomAvailabilitySlice from './Slice/roomAvailableCheckSlice'
import bookedDatesSlice from './Slice/bookedDatesSlice';
import myBookingsSlice from './Slice/myBookingsSlice';
import myBookingsDetailSlice from './Slice/myBookingsDetailSlice'
import newReviewSlice from './Slice/newReviewsSlice';
import allAdminRoomsSlice from './Slice/allAdminRoomsSlice'
import newAdminRoomSlice from './Slice/newAdminRoomSlice';
import updateRoomSlice from './Slice/updateRoomSlice';
import deleteRoomSlice from './Slice/deleteRoomSlice'
import allAdminBookingsSlice from './Slice/allAdminBookingsSlice';
import deleteBookingSlice from './Slice/deleteBookingSlice';
import allAdminUsersSlice from './Slice/allAdminUsersSlice';
import getUserDetailsSlice from './Slice/getUserDetailsSlice';
import updateUserDetailsSlice from './Slice/updateUserDetailsSlice';
import deleteUserSlice from './Slice/deleteUserSlice'
import getRoomReviewsSlice from './Slice/getRoomReviewsSlice';
import deleteReviewSlice from './Slice/deleteReviewSlice';



// redux hydrate config 
const rootReducer = (state, action) => {
    switch(action.type) {
        case HYDRATE:
            return action.payload
        default: {
            const combineReducer = combineReducers({
                allRooms: allRoomsSlice,
                room: roomSlice,
                registerUser: registerUserSlice,
                currentUser: userSlice,
                updateUser: updateUserSlice,
                forgotPassword: forgotPasswordSlice,
                resetPassword: resetPasswordSlice,
                roomAvailability: roomAvailabilitySlice,
                bookedDates: bookedDatesSlice,
                myBookings: myBookingsSlice,
                myBookingsDetail: myBookingsDetailSlice,
                newReview: newReviewSlice,
                allAdminRooms: allAdminRoomsSlice,
                newAdminRoom: newAdminRoomSlice,
                updateRoom: updateRoomSlice,
                deleteRoom: deleteRoomSlice,
                allAdminBookings: allAdminBookingsSlice,
                deleteBooking: deleteBookingSlice,
                allAdminUsers: allAdminUsersSlice,
                userDetails: getUserDetailsSlice,
                updateUserDetails: updateUserDetailsSlice,
                deleteUser: deleteUserSlice,
                roomReviews: getRoomReviewsSlice,
                deleteReview: deleteReviewSlice

            })
            return combineReducer(state, action)
        }

    }
}



//redux toolkit configure store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
const makeStore = () => store; // createWrapper only recognizes makeStore thats why i passed store to makeStore
export const wrapper = createWrapper(makeStore);